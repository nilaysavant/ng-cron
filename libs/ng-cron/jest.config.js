module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/ng-cron',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
  displayName: 'ng-cron',
};
