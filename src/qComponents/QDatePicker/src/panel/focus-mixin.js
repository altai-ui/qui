const DATE_CELLS_COUNT = 42;
const DATE_CELLS_IN_ROW_COUNT = 7;

const PERIOD_CELLS_IN_ROW_COUNT = 4;

const HOURS_CELLS_COUNT = 24;
const MINUTES_CELLS_COUNT = 60;

const LEFT_DATE_PANEL_START_INDEX = 0;
const RIGHT_DATE_PANEL_START_INDEX = 42;

const LEFT_MONTH_PANEL_START_INDEX = 0;
const RIGHT_MONTH_PANEL_START_INDEX = 12;
const RIGHT_YEAR_PANEL_START_INDEX = 10;

const LEFT_TIME_PANEL_HOURS_INDEX = 0;
const LEFT_TIME_PANEL_MINUTES_INDEX = 24;
const LEFT_TIME_PANEL_SECONDS_INDEX = 84;

const RIGHT_TIME_PANEL_HOURS_INDEX = 144;
const RIGHT_TIME_PANEL_MINUTES_INDEX = 168;
const RIGHT_TIME_PANEL_SECONDS_INDEX = 228;

export default {
  data() {
    return {
      panelInFocus: null,
      lastFocusedCellIndex: null
    };
  },
  mounted() {
    this.dateCells = this.$el.querySelectorAll('.q-date-table .cell');
    this.timeCells = this.$el.querySelectorAll('.time-panel__pickers .cell');
    this.monthCells = this.$el.querySelectorAll('.q-month-table .cell');
    this.yearCells = this.$el.querySelectorAll('.q-year-table .cell');
  },

  methods: {
    setPanelFocus() {
      if (this.isRanged) {
        if (this.$refs.leftPanel?.contains(document.activeElement)) {
          this.panelInFocus = 'left';
        } else if (this.$refs.rightPanel?.contains(document.activeElement)) {
          this.panelInFocus = 'right';
        } else if (
          this.$refs.leftTimePanel?.$el.contains(document.activeElement)
        ) {
          this.panelInFocus = 'timeLeft';
        } else if (
          this.$refs.rightTimePanel?.$el.contains(document.activeElement)
        ) {
          this.panelInFocus = 'timeRight';
        }
      } else if (this.$refs.datePanel?.contains(document.activeElement)) {
        this.panelInFocus = 'date';
      } else if (this.$refs.timePanel?.$el.contains(document.activeElement)) {
        this.panelInFocus = 'time';
      } else {
        this.panelInFocus = null;
      }
    },

    navigateDropdown(e) {
      if (e.key !== 'Tab') {
        if (e.target.classList.contains('cell_time')) {
          this.moveWithinTime(e);
        } else if (e.target.classList.contains('cell_date')) {
          this.moveWithinDates(e);
        } else if (e.target.classList.contains('cell_month')) {
          this.moveWithinPeriod({ period: 'month', e });
        } else if (e.target.classList.contains('cell_year')) {
          this.moveWithinPeriod({ period: 'year', e });
        } else if (['monthrange', 'month'].includes(this.currentView)) {
          this.monthCells[0]?.focus();
        } else if (['yearrange', 'year'].includes(this.currentView)) {
          this.yearCells[0]?.focus();
        } else {
          this.dateCells[0]?.focus();
        }
      }

      this.setPanelFocus();
    },

    moveWithinPeriod({ period, e } = {}) {
      let currentNodeIndex;
      let nextNodeIndex;
      const periodCells = period === 'month' ? this.monthCells : this.yearCells;
      const rightPanelStartIndex =
        period === 'month'
          ? RIGHT_MONTH_PANEL_START_INDEX
          : RIGHT_YEAR_PANEL_START_INDEX;
      Array.from(periodCells).some((element, index) => {
        if (document.activeElement === element) {
          currentNodeIndex = index;
          return true;
        }

        return false;
      });

      switch (e.key) {
        case 'ArrowUp': {
          nextNodeIndex = currentNodeIndex - PERIOD_CELLS_IN_ROW_COUNT;
          break;
        }

        case 'ArrowRight':
          if (
            this.isRanged &&
            this.panelInFocus === 'left' &&
            (currentNodeIndex + 1) % PERIOD_CELLS_IN_ROW_COUNT === 0
          ) {
            nextNodeIndex = rightPanelStartIndex;
          } else {
            nextNodeIndex = currentNodeIndex + 1;
          }

          break;

        case 'ArrowLeft':
          if (
            this.isRanged &&
            this.panelInFocus === 'right' &&
            currentNodeIndex % PERIOD_CELLS_IN_ROW_COUNT === 0
          ) {
            nextNodeIndex = LEFT_MONTH_PANEL_START_INDEX + 3;
          } else {
            nextNodeIndex = currentNodeIndex - 1;
          }

          break;

        case 'ArrowDown': {
          nextNodeIndex = currentNodeIndex + PERIOD_CELLS_IN_ROW_COUNT;
          break;
        }
        default:
          break;
      }

      const node = periodCells[nextNodeIndex];
      const newIndex = nextNodeIndex % PERIOD_CELLS_IN_ROW_COUNT;
      if (node) {
        node.focus();
        this.lastFocusedCellIndex = nextNodeIndex;
      } else if (nextNodeIndex > this.lastFocusedCellIndex) {
        if (this.isRanged) {
          this.handleRightNextYearClick();
          this.handleLeftNextYearClick();
        } else {
          this.handleNextYearClick();
        }
        periodCells[newIndex]?.focus();
      } else if (nextNodeIndex < this.lastFocusedCellIndex) {
        if (this.isRanged) {
          this.handleLeftPrevYearClick();
          this.handleRightPrevYearClick();
        } else {
          this.handlePrevYearClick();
        }
      }
    },

    moveWithinDates(e) {
      this.timePanelInFocus = 'left';
      let currentNodeIndex;
      let nextNodeIndex;
      Array.from(this.dateCells).some((element, index) => {
        if (document.activeElement === element) {
          currentNodeIndex = index;

          return true;
        }

        return false;
      });

      switch (e.key) {
        case 'ArrowUp': {
          nextNodeIndex = currentNodeIndex - DATE_CELLS_IN_ROW_COUNT;
          break;
        }

        case 'ArrowRight':
          if (this.isRanged) {
            if (
              this.panelInFocus === 'left' &&
              (currentNodeIndex + 1) % DATE_CELLS_IN_ROW_COUNT === 0
            ) {
              nextNodeIndex = DATE_CELLS_COUNT;
              this.setPanelFocus();
              break;
            } else if (
              this.showTime &&
              this.panelInFocus === 'right' &&
              (currentNodeIndex + 1) % DATE_CELLS_IN_ROW_COUNT === 0
            ) {
              this.moveWithinTime();
              return;
            }

            nextNodeIndex = currentNodeIndex + 1;
          } else if (
            this.showTime &&
            (currentNodeIndex + 1) % DATE_CELLS_IN_ROW_COUNT === 0
          ) {
            this.moveWithinTime();
          } else {
            nextNodeIndex = currentNodeIndex + 1;
          }

          break;

        case 'ArrowLeft':
          if (
            this.panelInFocus === 'right' &&
            (currentNodeIndex - DATE_CELLS_IN_ROW_COUNT) %
              DATE_CELLS_IN_ROW_COUNT ===
              0
          ) {
            nextNodeIndex = DATE_CELLS_IN_ROW_COUNT - 1;
            this.setPanelFocus();
          } else {
            nextNodeIndex = currentNodeIndex - 1;
          }

          break;

        case 'ArrowDown': {
          nextNodeIndex = currentNodeIndex + DATE_CELLS_IN_ROW_COUNT;
          break;
        }
        default:
          break;
      }

      const node = this.dateCells[nextNodeIndex];
      const newIndex = nextNodeIndex % DATE_CELLS_IN_ROW_COUNT;
      if (node) {
        node.focus();
        this.lastFocusedCellIndex = nextNodeIndex;
      } else if (nextNodeIndex > this.lastFocusedCellIndex) {
        if (this.isRanged) {
          this.handleRightNextMonthClick();
          this.handleLeftNextMonthClick();
        } else {
          this.handleNextMonthClick();
        }
        this.dateCells[newIndex]?.focus();
      } else if (nextNodeIndex < this.lastFocusedCellIndex) {
        if (this.isRanged) {
          this.handleLeftPrevMonthClick();
          this.handleRightPrevMonthClick();
        } else {
          this.handlePrevMonthClick();
        }
        this.dateCells[DATE_CELLS_COUNT + newIndex]?.focus();
      }
    },

    moveWithinTime(e) {
      // switch from date
      if (!e) {
        if (this.timeCells[0]?.disabled) return;
        this.timeCells[0].focus();
        this.setPanelFocus();
        // true keyup
      } else {
        let currentNodeIndex;
        let nextNodeIndex;
        this.timeCells.forEach((element, index) => {
          if (document.activeElement === element) {
            currentNodeIndex = index;
          }
        });

        switch (e.key) {
          case 'ArrowUp': {
            nextNodeIndex = currentNodeIndex - 1;
            break;
          }

          case 'ArrowRight':
            if (this.isRanged) {
              switch (true) {
                case this.panelInFocus === 'timeLeft' &&
                  e.target.classList.contains('cell_hours'):
                  nextNodeIndex = LEFT_TIME_PANEL_MINUTES_INDEX;
                  break;
                case this.panelInFocus === 'timeLeft' &&
                  e.target.classList.contains('cell_minutes'):
                  nextNodeIndex = LEFT_TIME_PANEL_SECONDS_INDEX;
                  break;
                case this.panelInFocus === 'timeLeft' &&
                  e.target.classList.contains('cell_seconds'):
                  nextNodeIndex = RIGHT_TIME_PANEL_HOURS_INDEX;
                  break;
                case this.panelInFocus === 'timeRight' &&
                  e.target.classList.contains('cell_hours'):
                  nextNodeIndex = RIGHT_TIME_PANEL_MINUTES_INDEX;
                  break;
                case this.panelInFocus === 'timeRight' &&
                  e.target.classList.contains('cell_minutes'):
                  nextNodeIndex = RIGHT_TIME_PANEL_SECONDS_INDEX;
                  break;
                default:
                  break;
              }

              break;
            }

            if (e.target.classList.contains('cell_hours')) {
              nextNodeIndex = LEFT_TIME_PANEL_MINUTES_INDEX;
            } else if (e.target.classList.contains('cell_minutes')) {
              nextNodeIndex = LEFT_TIME_PANEL_SECONDS_INDEX;
            }
            break;

          case 'ArrowLeft':
            if (this.isRanged) {
              switch (true) {
                case this.panelInFocus === 'timeRight' &&
                  e.target.classList.contains('cell_seconds'):
                  nextNodeIndex = RIGHT_TIME_PANEL_MINUTES_INDEX;
                  break;
                case this.panelInFocus === 'timeRight' &&
                  e.target.classList.contains('cell_minutes'):
                  nextNodeIndex = RIGHT_TIME_PANEL_HOURS_INDEX;
                  break;
                case this.panelInFocus === 'timeRight' &&
                  e.target.classList.contains('cell_hours'):
                  nextNodeIndex = LEFT_TIME_PANEL_SECONDS_INDEX;
                  break;
                case this.panelInFocus === 'timeLeft' &&
                  e.target.classList.contains('cell_seconds'):
                  nextNodeIndex = LEFT_TIME_PANEL_MINUTES_INDEX;
                  break;
                case this.panelInFocus === 'timeLeft' &&
                  e.target.classList.contains('cell_minutes'):
                  nextNodeIndex = LEFT_TIME_PANEL_HOURS_INDEX;
                  break;
                case this.panelInFocus === 'timeLeft' &&
                  e.target.classList.contains('cell_hours'):
                  this.dateCells[RIGHT_DATE_PANEL_START_INDEX + 6]?.focus();
                  break;
                default:
                  break;
              }

              if (
                this.panelInFocus === 'timeRight' &&
                e.target.classList.contains('cell_seconds')
              ) {
                nextNodeIndex = RIGHT_TIME_PANEL_MINUTES_INDEX;
              } else if (
                this.panelInFocus === 'timeRight' &&
                e.target.classList.contains('cell_minutes')
              ) {
                nextNodeIndex = RIGHT_TIME_PANEL_HOURS_INDEX;
              } else if (
                this.panelInFocus === 'timeRight' &&
                e.target.classList.contains('cell_hours')
              ) {
                nextNodeIndex = LEFT_TIME_PANEL_SECONDS_INDEX;
              }
            } else if (e.target.classList.contains('cell_seconds')) {
              nextNodeIndex = LEFT_TIME_PANEL_MINUTES_INDEX;
            } else if (e.target.classList.contains('cell_minutes')) {
              nextNodeIndex = LEFT_TIME_PANEL_HOURS_INDEX;
            } else {
              // switch to dates
              this.dateCells[DATE_CELLS_IN_ROW_COUNT - 1]?.focus();
            }

            break;

          case 'ArrowDown': {
            nextNodeIndex = currentNodeIndex + 1;
            break;
          }
          default:
            break;
        }

        this.timeCells[nextNodeIndex]?.focus();
        this.setPanelFocus();
      }
    }
  }
};
