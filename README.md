# Development Tools

This directory contains various development tools. Each tool is organized in its own directory with a complete structure including specifications, source code, tests, and examples.

## Directory Structure

```
tools/
└── tool_name/     # Individual tool directory
    ├── spec/      # IMPORTANT: Read this first
    ├── src/       # Source code
    ├── test/      # Test files
    └── examples/  # Example files
```

## Tool Development Guidelines

1. **Read First**: Always start with the spec
   - Each tool contains its own spec/ directory
   - Specifications define formats, requirements, and limitations
   - The spec is the source of truth and must be read before using or modifying any tool

2. **Standard Structure**
   - Every tool follows the same directory organization:
     * spec/ - Format definitions and requirements
     * src/ - Implementation files
     * test/ - Test suite
     * examples/ - Sample input/output files
