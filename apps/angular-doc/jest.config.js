module.exports = {
  name: 'doc',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/doc',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
