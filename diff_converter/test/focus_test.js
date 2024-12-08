const assert = require('assert');
const processChanges = require('../src/core/file/processChanges');

describe('Focus Test - Context-Aware Changes', () => {
  it('should process changes with context', () => {
    // Input lines represent the current content of the file
    const input = [
      '<div class="header">',
      '  <h1>Welcome</h1>',
      '</div>',
      '<p>Old text here</p>',
      '<div class="footer">',
      '  <p>Footer content</p>',
      '</div>'
    ];

    // FileData contains the context and changes from the .sdf file
    const fileData = {
      beforeContext: [
        '<div class="header">',
        '  <h1>Welcome</h1>',
        '</div>'
      ],
      afterContext: [
        '<div class="footer">',
        '  <p>Footer content</p>',
        '</div>'
      ],
      changes: [
        { type: '-', content: '<p>Old text here</p>' },
        { type: '+', content: '<p>New text here</p>' }
      ]
    };

    const result = processChanges(input, fileData);
    const expected = [
      '<div class="header">',
      '  <h1>Welcome</h1>',
      '</div>',
      '<p>New text here</p>',
      '<div class="footer">',
      '  <p>Footer content</p>',
      '</div>'
    ];

    assert.deepStrictEqual(result, expected);
  });
});
