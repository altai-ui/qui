const { renderBadges } = require('badges');
const fs = require('fs');

// Listing of badges to output
const list = [
  [
    'shields',
    {
      left: 'storybook',
      right: 'yes',
      color: 'green',
      alt: 'storybook',
      url: 'https://qvant-lab.github.io/qui',
      title: 'storybook'
    }
  ],
  [
    'shields',
    {
      left: 'responsive',
      right: 'yes',
      color: 'green',
      title: 'responsive'
    }
  ],
  'npmversion',
  'npmdownloads',
  'daviddm',
  'daviddmdev'
];

// Configuration for the badges
const config = {
  npmPackageName: '@qvant/qui',

  saucelabsUsername: 'Qui',
  githubSlug: 'Qvant-lab/qui',
  nodeicoQueryString: { downloads: true, compact: true, height: 2 },
  homepage: 'https://qvant-lab.github.io/qui/'
};

// Options for rendering the badges
const options = {
  // Filter Category
  // When set to a string, will only render badges from the list that of the specified category
  // Values can be 'development', 'testing', 'funding', or 'social'
  // E.g. to render only funding badges, set to 'funding'
  filterCategory: false,

  // Filter Scripts
  // When true, do not render any badges from the list that are scripts
  filterScripts: false
};

// Render the badges to a string
const badges = renderBadges(list, config, options);

fs.readFile('README.md', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  const result = data.replace(
    /<!--BADGES-->((.|\n)*)<!--\/BADGES-->/g,
    `<!--BADGES-->${badges}<!--/BADGES-->`
  );

  return fs.writeFile('README.md', result, 'utf8', function(error) {
    if (error) return console.log(error);
    return 'Badges are placed!';
  });
});
