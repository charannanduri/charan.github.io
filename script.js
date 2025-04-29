document.addEventListener('DOMContentLoaded', (event) => {
    const welcomeMessage = "Welcome to Charan.xyz, my personal website.\n Im a 4th year ECE student at Ohio State.\n\nType 'help' to see available commands.";
    appendToOutput(welcomeMessage);
});

document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        processCommand(this.value);
        this.value = ''; // Clear input after enter
    }
});



function processCommand(command) {
    const output = document.getElementById('output');
    const newLine = document.createElement('div');

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
            newLine.textContent = 'Error: Command not found. type help for a list of commands';
    }
    output.appendChild(newLine);
    appendToOutput('');
}

function typeOut(lines) {
    const output = document.getElementById('output');
    let currentLine = 0;
    let htmlContent = output.innerHTML; // Start with current output content
    function typeLine() {
        if (currentLine < lines.length) {
            let line = lines[currentLine];
            let charIndex = 0;
            let typeChar = function() {
                if (charIndex < line.length) {
                    htmlContent += line[charIndex++]; // Accumulate characters in htmlContent
                    output.innerHTML = htmlContent; // Update innerHTML with the accumulated content
                    scrollToBottom(); // Scroll every time a new character is added
                    setTimeout(() => typeChar(line, charIndex, output, htmlContent), 10); // Typing speed
                } else {
                    htmlContent += '<br>'; // Add a single break after each line
                    currentLine++;
                    if (currentLine < lines.length) {
                        setTimeout(typeLine, 500); // Delay before next line if more lines exist
                    } else {
                        htmlContent += '<br>'; // Add an extra break only after the entire command's output
                        output.innerHTML = htmlContent; // Update the output one last time
                    }
                }
            };
            typeChar();
        }
    }

    typeLine();
}

function scrollToBottom() {
    const outputContainer = document.getElementById('output-container');
    outputContainer.scrollTop = outputContainer.scrollHeight;
}

function appendToOutput(text) {
    const output = document.getElementById('output');
    const newLine = document.createElement('div');
    newLine.textContent = text;
    output.appendChild(newLine);

    const spacing = document.createElement('div');
    spacing.innerHTML = '&nbsp;'; // Non-breaking space for an empty line
    output.appendChild(spacing);

    scrollToBottom(); // Call this function to scroll the output into view
}