module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'tests/e2e/step-definitions/**/*.ts',
      'tests/e2e/support/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ],
    parallel: 1
  }
}