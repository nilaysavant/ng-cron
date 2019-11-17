module.exports = {
  name: 'cron',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ng-cron',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
