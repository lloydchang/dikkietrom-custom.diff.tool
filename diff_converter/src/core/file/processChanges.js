const { log } = require('../../lib/logger');

/**
 * Process changes to a file using context
 * @param {string[]} lines - Array of existing file lines
 * @param {Object} fileData - Object containing changes and context
 * @returns {string[]} - The processed lines
 */
function processChanges(lines, fileData) {
    const { changes, beforeContext, afterContext } = fileData;
    log('\n=== Processing Changes ===');
    log('Input lines:', lines);
    log('Before context:', beforeContext);
    log('After context:', afterContext);
    log('Changes:', changes);

    let result = [...lines];

    // If no context provided, fall back to simple replacement
    if (!beforeContext || !afterContext) {
        log('No context provided falling back to simple replacement');
        const deletions = changes.filter(c => c.type === '-').map(c => c.content.trim());
        const additions = changes.filter(c => c.type === '+').map(c => c.content.trim());

        log('Deletions:', deletions);
        log('Additions:', additions);

        result = result.filter(line => !deletions.includes(line.trim()));
        result.push(...additions);
        log('Result after simple replacement:', result);
        return result;
    }

    // Find the insertion point using context
    let contextStartIndex = -1;
    let contextEndIndex = -1;

    // Search for the before context
    log('\nSearching for before context...');
    for (let i = 0; i < result.length; i++) {
        let matches = true;
        for (let j = 0; j < beforeContext.length; j++) {
            log(`Comparing line ${i + j}:`, 
                `"${result[i + j]?.trim()}" with "${beforeContext[j]?.trim()}"`);
            if (i + j >= result.length || result[i + j].trim() !== beforeContext[j].trim()) {
                matches = false;
                break;
            }
        }
        if (matches) {
            contextStartIndex = i + beforeContext.length;
            log('Found before context at index:', i);
            log('Context start index:', contextStartIndex);
            break;
        }
    }

    // If we found the start context, search for the after context
    log('\nSearching for after context...');
    if (contextStartIndex !== -1) {
        for (let i = contextStartIndex; i < result.length; i++) {
            let matches = true;
            for (let j = 0; j < afterContext.length; j++) {
                log(`Comparing line ${i + j}:`,
                    `"${result[i + j]?.trim()}" with "${afterContext[j]?.trim()}"`);
                if (i + j >= result.length || result[i + j].trim() !== afterContext[j].trim()) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                contextEndIndex = i;
                log('Found after context at index:', i);
                break;
            }
        }
    }

    // If we found both contexts, apply the changes
    if (contextStartIndex !== -1 && contextEndIndex !== -1) {
        log('\nApplying changes...');
        log('Context start index:', contextStartIndex);
        log('Context end index:', contextEndIndex);

        // Get the additions (lines starting with +)
        const additions = changes
            .filter(c => c.type === '+')
            .map(c => c.content);
        log('Additions to apply:', additions);

        // Replace the content between contexts
        const beforePart = result.slice(0, contextStartIndex);
        const afterPart = result.slice(contextEndIndex);
        
        log('Before part:', beforePart);
        log('After part:', afterPart);
        
        // Combine the parts with the new content
        result = [...beforePart, ...additions, ...afterPart];
        log('Final result:', result);
    } else {
        log('\nWarning: Could not find both contexts');
        log('Context start index:', contextStartIndex);
        log('Context end index:', contextEndIndex);
    }

    return result;
}

module.exports = processChanges;
