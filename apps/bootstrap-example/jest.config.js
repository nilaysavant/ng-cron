module.exports = {
  name: 'bootstrap-example',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/bootstrap-example',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
