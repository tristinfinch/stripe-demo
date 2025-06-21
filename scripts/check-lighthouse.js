const { execSync } = require('child_process');
const fs = require('fs');

function runLighthouse() {
  try {
    // Run Lighthouse CLI and output to temporary JSON file
    execSync('lighthouse http://localhost:3000 --output=json --output-path=./.lighthouse-temp.json --quiet');
    
    // Read and parse results
    const report = JSON.parse(fs.readFileSync('./.lighthouse-temp.json', 'utf8'));
    fs.unlinkSync('./.lighthouse-temp.json');

    const scores = {
      performance: report.categories.performance.score * 100,
      accessibility: report.categories.accessibility.score * 100,
      bestPractices: report.categories['best-practices'].score * 100,
      seo: report.categories.seo.score * 100
    };

    console.log('Lighthouse Scores:');
    let allPassed = true;
    for (const [category, score] of Object.entries(scores)) {
      const passed = score >= 90;
      if (!passed) allPassed = false;
      console.log(`- ${category.charAt(0).toUpperCase() + category.slice(1)}: ${Math.round(score)} (${passed ? '✓' : '✗'})`);
    }

    if (!allPassed) {
      console.log('\nThreshold check failed - see full report with \'pnpm lighthouse:report\'');
      process.exit(1);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

runLighthouse();
