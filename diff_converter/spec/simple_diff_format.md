# Simple Diff Format Specification

## Version 1.0.0

### Format Overview

The Simple Diff Format (SDF) is a human-readable format for specifying file changes. Each file's changes are marked with a FILE header followed by lines indicating additions and deletions. When processed, changes are automatically applied to the files and committed to git.

### Syntax Rules

1. File Declaration
   ```
   FILE: <filepath>
   ```
   - Must start with "FILE: " (including the space)
   - Filepath should be relative to the project root
   - Each file's changes must be separated by one or more blank lines

2. Change Lines
   - Addition: Starts with "+ " (plus and space)
   - Deletion: Starts with "- " (minus and space)
   - No context lines supported
   - Leading/trailing whitespace after +/- is preserved
   - Empty lines between changes are ignored

### Example
```
FILE: index.html
+ <div class="header">New Header</div>
- <div class="old-header">Old Header</div>

FILE: styles.css
+ .header { color: blue; }
- .old-header { color: red; }
```

### Validation Rules

1. File Declaration
   - Must be the first non-empty line for each file section
   - Cannot contain newlines in the filepath
   - Filepath cannot be empty

2. Change Lines
   - Must start with either "+ " or "- "
   - Cannot mix other markers
   - Cannot have empty addition/deletion lines (e.g., "+ " alone)

3. General
   - UTF-8 encoding required
   - Unix-style line endings recommended (\\n)
   - At least one change required per file
   - Files must be separated by one or more blank lines

### Error Handling

1. Invalid Format Errors
   - Missing FILE: header
   - Invalid change line markers
   - Empty filepaths

2. Content Errors
   - Empty files
   - Files with no changes
   - Invalid UTF-8 encoding

### Limitations

1. No support for:
   - Binary files
   - File mode changes
   - File moves/renames
   - Context lines
   - Line numbers
   - Multiple hunks per file

### Usage

1. Processing Changes
   ```
   node src/diff_converter.js <input_diff_file>
   ```
   The tool will:
   1. Parse and validate the diff file
   2. Create backup files before making changes
   3. Apply changes directly to the target files
   4. Stage modified files using 'git add'
   5. Create a commit with the changes
   6. Report success/failure for each operation

### Implementation Details

1. File Operations:
   - Creates backup files before making changes
   - Validates file paths and content before applying
   - Reports success/failure for each file
   - Maintains file permissions
   - Handles both additions and deletions
   - Supports relative paths from the current directory

2. Git Operations:
   - Automatically stages modified files
   - Creates a commit with descriptive message
   - Validates git repository status before changes
   - Reports any git-related errors
