module.exports = {
  name: 'cron-bootstrap',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/cron-bootstrap',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
