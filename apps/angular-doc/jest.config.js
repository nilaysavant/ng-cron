module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/doc',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
  displayName: 'angular-doc',
};
