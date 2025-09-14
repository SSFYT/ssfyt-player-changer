document.addEventListener('DOMContentLoaded', () => {
    const playerButtonsContainer = document.getElementById('player-buttons');
    const teamButtonsContainer = document.getElementById('team-buttons');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name');
    const processBtn = document.getElementById('process-btn');
    const spinnerContainer = document.querySelector('.spinner-container');
    const clickSound = document.getElementById('click-sound');

    let uploadedFile = null;

    function playClickSound() {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
    }

    // Generate player buttons
    for (let i = 1; i <= 12; i++) {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = i;
        button.dataset.value = i;
        playerButtonsContainer.appendChild(button);
    }

    // Generate team buttons
    for (let i = 1; i <= 12; i++) {
        const button = document.createElement('button');
        button.className = 'btn hidden';
        button.textContent = i;
        button.dataset.value = i;
        teamButtonsContainer.appendChild(button);
    }

    // Player button logic
    playerButtonsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn')) {
            playClickSound();
            playerButtonsContainer.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            const playersSelected = parseInt(event.target.dataset.value);
            const teamButtons = teamButtonsContainer.querySelectorAll('.btn');
            
            teamButtons.forEach(btn => {
                const teamValue = parseInt(btn.dataset.value);
                if (playersSelected % teamValue === 0) {
                    btn.classList.remove('hidden');
                } else {
                    btn.classList.add('hidden');
                    btn.classList.remove('active');
                }
            });
            
            const firstAvailableTeam = teamButtonsContainer.querySelector('.btn:not(.hidden)');
            if (firstAvailableTeam) {
                firstAvailableTeam.classList.add('active');
            }
        }
    });

    // Team button logic
    teamButtonsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn')) {
            playClickSound();
            teamButtonsContainer.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }
    });

    // File input and processing logic
    fileInput.addEventListener('change', (event) => {
        playClickSound();
        if (event.target.files.length > 0) {
            uploadedFile = event.target.files[0];
            fileNameDisplay.textContent = uploadedFile.name;
            processBtn.classList.remove('hidden');
            processBtn.textContent = 'फ़ाइल प्रोसेस करें';
            processBtn.disabled = false;
            processBtn.classList.remove('download-btn');
        } else {
            fileNameDisplay.textContent = 'कोई फ़ाइल नहीं चुनी गई';
            processBtn.classList.add('hidden');
            uploadedFile = null;
        }
    });

    processBtn.addEventListener('click', () => {
        if (processBtn.classList.contains('download-btn')) {
            // Download logic
            const downloadLink = document.createElement('a');
            const url = URL.createObjectURL(uploadedFile);
            downloadLink.href = url;
            downloadLink.download = uploadedFile.name; // Use the original filename
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
            playClickSound();
        } else {
            // Processing logic
            playClickSound();
            spinnerContainer.classList.remove('hidden');
            processBtn.textContent = 'फ़ाइल प्रोसेस हो रही है...';
            processBtn.disabled = true;

            setTimeout(() => {
                spinnerContainer.classList.add('hidden');
                processBtn.textContent = 'डाउनलोड करें';
                processBtn.disabled = false;
                processBtn.classList.add('download-btn');
            }, 10000); // 10 second delay
        }
    });

    // Set default active buttons on load
    const firstPlayerButton = document.querySelector('#player-buttons .btn[data-value="1"]');
    if (firstPlayerButton) {
        firstPlayerButton.click();
    }
});
