module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'tests/e2e/step-definitions/**/*.ts',
      'tests/e2e/support/**/*.ts'
    ],
        paths: [
      'tests/e2e/features/**/*.feature'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ]
  }
}