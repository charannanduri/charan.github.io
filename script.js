document.addEventListener('DOMContentLoaded', (event) => {
    // const welcomeMessage = "Welcome to Charan.xyz, my personal website.\n Im a 4th year ECE student at Ohio State.\n\nType 'help' to see available commands.";
    // appendToOutput(welcomeMessage); // Removed: Welcome message now in HTML overlay

    const inputElement = document.getElementById('input');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const msg1 = document.getElementById('welcome-msg-1');
    const msg2 = document.getElementById('welcome-msg-2');
    const msg3 = document.getElementById('welcome-msg-3');

    const msg1Text = "Welcome to my personal website.";
    const msg2Text = "I'm an ECE student at Ohio State.";
    const msg3Text = "Type 'help' in the terminal to start.";

    const typingSpeed = 30; // Milliseconds per character
    const backspaceSpeed = 20; // Faster backspace speed
    const messageDelay = 1000; // Delay after a message finishes typing/backspacing

    // Helper function for typing effect
    function typeWelcomeMessage(element, text, speed, callback) {
        let charIndex = 0;
        element.textContent = '';

        function typeChar() {
            if (charIndex < text.length) {
                element.textContent += text[charIndex++];
                setTimeout(typeChar, speed);
            } else if (callback) {
                setTimeout(callback, messageDelay); // Wait before calling next step (e.g., backspace)
            }
        }
        typeChar();
    }

    // Helper function for backspace effect
    function backspaceWelcomeMessage(element, speed, callback) {
        let text = element.textContent;
        
        function backspaceChar() {
            if (text.length > 0) {
                text = text.slice(0, -1);
                element.textContent = text;
                setTimeout(backspaceChar, speed);
            } else if (callback) {
                setTimeout(callback, messageDelay / 2); // Shorter delay before typing next message
            }
        }
        backspaceChar();
    }

    // Start the typing/backspacing sequence
    if (msg1 && msg2 && msg3) {
        setTimeout(() => { // Initial delay
            typeWelcomeMessage(msg1, msg1Text, typingSpeed, () => {
                backspaceWelcomeMessage(msg1, backspaceSpeed, () => {
                    typeWelcomeMessage(msg2, msg2Text, typingSpeed, () => {
                        backspaceWelcomeMessage(msg2, backspaceSpeed, () => {
                            typeWelcomeMessage(msg3, msg3Text, typingSpeed, () => {
                                // After the last message is typed, wait a bit then hide overlay
                                setTimeout(() => {
                                    if (welcomeOverlay) {
                                        welcomeOverlay.classList.add('welcome-done');
                                    }
                                }, 2000); // Wait 2 seconds after last message
                            });
                        });
                    });
                });
            });
        }, 500); // Short initial delay
    }
});

// Command History
let commandHistory = [];
let historyIndex = -1; // Initialize history index

const inputElement = document.getElementById('input');

inputElement.addEventListener('keydown', function(event) {
    const command = this.value.trim();
    const msg3Element = document.getElementById('welcome-msg-3');

    if (event.key === "Enter") {
        // Check if the command is 'help' and fade out the persistent message
        if (command.toLowerCase() === 'help' && msg3Element) {
             msg3Element.classList.add('fade-out'); // Add class to trigger CSS fade
        }

        if (command) {
            processCommand(command);
            // Add to history only if it's different from the last command
            if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== command) {
                 commandHistory.push(command);
            }
            historyIndex = commandHistory.length; // Reset history index to the end
            this.value = ''; // Clear input after enter
        } else {
            // If Enter is pressed with no command, just add a new prompt line
            appendToOutput('', ''); // Pass empty strings to signify no command was run
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault(); // Prevent cursor jump
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
            // Move cursor to end of the restored command
            setTimeout(() => this.selectionStart = this.selectionEnd = this.value.length, 0);
        }
    } else if (event.key === "ArrowDown") {
        event.preventDefault(); // Prevent cursor jump
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
            // Move cursor to end of the restored command
            setTimeout(() => this.selectionStart = this.selectionEnd = this.value.length, 0);
        } else if (historyIndex === commandHistory.length - 1) {
            // If at the bottom of history, pressing down again clears the input
            historyIndex = commandHistory.length;
            this.value = '';
        }
    }
});

// --- Keyboard Handling for Mobile ---
inputElement.addEventListener('focus', function() {
    // Add a class to the body or terminal when the input is focused
    // This helps CSS rules adjust the layout for the keyboard
    document.body.classList.add('keyboard-visible');
});

inputElement.addEventListener('blur', function() {
    // Remove the class when the input loses focus
    document.body.classList.remove('keyboard-visible');
    // Optional: Ensure scrolling is correct after keyboard hides
    setTimeout(scrollToBottom, 100); // Small delay might be needed
});
// --- End Keyboard Handling ---

function processCommand(command) {
    const output = document.getElementById('output');
    // Display the command line itself before processing/typing output
    // appendToOutput(command, command); // REMOVED THIS LINE

    let resumeViewed = false; // Assuming this should be scoped or managed differently if persistence is needed

    // --- Add the executed command to the output ---
    const commandLine = document.createElement('div');
    commandLine.textContent = `user@charan.xyz:~$ ${command}`; // Manually add prompt + command here
    output.appendChild(commandLine);
    // --- End command display ---

    switch (command.toLowerCase()) {
        case 'help':
            const helpCommands = [
                "Available Commands:",
                "about: a little about myself",
                "resume: summarized resume and a link to download the pdf",
                "projects: a list of projects that Ive done (sorry its not updated supper often)",
                "about site: how I built this site, and how you could make something similar!",
                "Theres also some easter eggs! ..."

            ];
            typeOut(helpCommands, output);
            break;
        case 'about':
            const aboutCharan = [
                "Hey yall. Im Charan. I enjoy building electronics, economics & markets, and fashion. I also love basketball. Lets Go Cavs!. Feel free to drop me a line or LinkedIn. Use the resume command to find my handle!"
            ];
            typeOut(aboutCharan, output);
            break;
        case 'about site':
            const aboutSite = [
                "Built in 2024, in Columbus, OH by a Human and a Robot",
                "",
                "I spend a bunch of time in the macOS terminal, I thought it would be cool to emulate it for my personal site.",
                "This was all built in native CSS, JS and HTML.",
                "While I did use GPT4 Turbo for some of the site, a lot of it was done by me with a ton of trial and error... lol",
                "If youre savvy enough Im sure you could poke around inspect element and figure it out.",
                "If you want to build a site just like this, email me at nanduri.9@osu.edu, and Ill get you sorted.",

            ];
            typeOut(aboutSite, output);
            break;
        case 'resume':
            resumeViewed = true;
            const resumeContent = [
                "Venkat-Saicharan (Charan) A. Nanduri",
                "Electrical & Computer Engineering (Spring 2025)", 
                "Minor in Economics",
                "Contact: nanduri.9@osu.edu | (614) 542-9691 | linkedin.com/in/charannanduri",
                "Experience:",
                "Electrical Engineering Intern at Milwaukee Tool, Undergraduate Research Assistant at OSU",
                "Skills:", 
                "Microelectronics, Computer Architecture, Linux, Altium Designer, C/C++, MATLAB",
                "Projects:",
                "Capacitive Touch Sensing, Liquid Metal Cooled Inverter, Inductive Sensing",
                "Education:",
                 "The Ohio State University, Purdue University",
            ];
            const resumeLink = document.createElement('a');
            resumeLink.href = 'resume.pdf'; // Update with the correct path
            resumeLink.textContent = 'Click for Resume PDF';
            resumeLink.style.color = '#00ff00'; // Set the link color to match your terminal
            resumeLink.target = '_blank'; // Opens in a new tab

            const newLine = document.createElement('div');
            newLine.appendChild(resumeLink);
            output.appendChild(newLine);
            typeOut(resumeContent, output);
            break;
        case 'projects':
            if(resumeViewed){
                const projectsContent = [
                    "Projects:",
                    "",
                    "1. Capacitive Touch Sensing and Design Implementation - ",
                    "Worked within the Outdoor Power Equipment organization at Milwaukee Tool. Developed a clean sheet schematic, PCB layout design, and wrote C firmware for a new sensor IC.",
                    "2. Ultra High Power Density Liquid Metal Cooled Inverter -",
                    "Undergraduate research at OSU Center for High Performance Power Electronics. Focused on firmware development for optical temperature sensors and control firmware to prevent overheating in a 3-phase inverter system."
                ];
                typeOut(projectsContent, output);
            }
            else if(!resumeViewed)
            {
                const projError = [
                    "Error: in order to access project descriptions, you must first enter the resume command."
                ]
                typeOut(projError, output);
            }
            break;
        case 'block o':
            const blockO = [
                "-/OOOOOOOOOOOOOOOOOO\\-",
                "/OOOOOOOOOOOOOOOOOOOO\\",
                "|OOOOOO/------\\OOOOOO|",
                "|OOOOOO|------|OOOOOO|",
                "|OOOOOO|------|OOOOOO|",
                "|OOOOOO|------|OOOOOO|",
                "|OOOOOO|------|OOOOOO|",
                "|OOOOOO|------|OOOOOO|",
                "|OOOOOO|------|OOOOOO|",
                "\\OOOOOOOOOOOOOOOOOOOO/",
                "-\\OOOOOOOOOOOOOOOOOO/-",
                "",
                "Go Bucks!",

            ];
            typeOut(blockO, output);
            break;
            
        default:
            // Create a div for the error message directly
            const errorLine = document.createElement('div');
            errorLine.textContent = 'Error: Command not found. type help for a list of commands';
            output.appendChild(errorLine); // Append the error line
            appendToOutput('', ''); // Append the next prompt line ONLY AFTER the error
            return; // Exit switch to avoid calling typeOut
    }
    // Note: typeOut now handles appending the next prompt after it finishes
}

function typeOut(lines, callback) { // Added callback parameter
    const output = document.getElementById('output');
    let currentLine = 0;

    function typeLine() {
        if (currentLine < lines.length) {
            let line = lines[currentLine];
            let charIndex = 0;
            let currentLineDiv = document.createElement('div'); // Create div for the line
            // Preserve leading spaces for formatting (like Block O)
            currentLineDiv.style.whiteSpace = 'pre';
            output.appendChild(currentLineDiv); // Append div to output area

            let typeChar = function() {
                if (charIndex < line.length) {
                    currentLineDiv.textContent += line[charIndex++];
                    setTimeout(typeChar, 10); // Adjust typing speed if needed
                } else {
                    currentLine++;
                    scrollToBottom();
                    setTimeout(typeLine, 50); // Delay between lines
                }
            };
            typeChar();
        } else {
            // Finished typing all lines
            appendToOutput('', ''); // Add the next prompt line ONLY after typing finishes
            if (callback) {
                callback(); // Execute callback if provided
            }
        }
    }
    typeLine();
}

function scrollToBottom() {
    const outputContainer = document.getElementById('output-container');
    outputContainer.scrollTop = outputContainer.scrollHeight;
}

// Modified appendToOutput to handle displaying the command line or just the next prompt
function appendToOutput(commandText, outputText) { // Parameters might not be needed anymore
    const output = document.getElementById('output');
    const inputLine = document.getElementById('input-line'); // Get the input line container

    // REMOVED: Logic to display command/output text here, handled in processCommand/typeOut

    // --- Logic to add ONLY the prompt line ---
    // Create a new input line structure (prompt + input field container)
    // This might be simplified if your HTML structure is different
    // This assumes we want a fresh input line after each command/output.
    // If we are reusing the existing #input-line, this needs adjustment.

    // For now, let's assume we just need to make sure the #input-line is visible and scrolled correctly.
    // The prompt itself is part of the static HTML in #input-line.

    // Ensure the static input line is visible and at the bottom
    inputLine.style.display = 'flex'; // Ensure it's visible if hidden previously
    scrollToBottom(); // Scroll down after adding content or prompt
    // --- End prompt logic ---
}