document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const nameDisplay = document.getElementById('countdownName');
    const layoutSelect = document.getElementById('layout');
    const bgColorInput = document.getElementById('bgColor');
    const countdownContainer = document.getElementById('countdownContainer');
    const fontSelect = document.getElementById('fontSelect');
    const nameColorInput = document.getElementById('nameColor');
    const languageSelect = document.getElementById('language');
    const datetimeInput = document.getElementById('datetime');
    const backgroundSelect = document.getElementById('backgroundSelect');
    
    let countdownInterval;

    // Change countdown name
    nameInput.addEventListener('input', function() {
        nameDisplay.textContent = nameInput.value || 'My Countdown';  // Fallback name
    });

    // Change layout between horizontal and vertical
    layoutSelect.addEventListener('change', function() {
        const countdown = document.getElementById('countdown');
        if (layoutSelect.value === 'horizontal') {
            countdown.style.flexDirection = 'row';  // Horizontal layout
            countdownContainer.style.width = '100%';  // Full width for horizontal
        } else {
            countdown.style.flexDirection = 'column';  // Vertical layout
            countdownContainer.style.width = '300px';  // Adjust width for vertical
        }
    });

    // Change background color
    bgColorInput.addEventListener('input', function() {
        countdownContainer.style.backgroundColor = bgColorInput.value;
    });

    // Change font style
    fontSelect.addEventListener('change', function() {
        document.body.style.fontFamily = fontSelect.value;
    });

    // Change countdown name color
    nameColorInput.addEventListener('input', function() {
        nameDisplay.style.color = nameColorInput.value;
    });

    // Change language (update labels dynamically)
    const languageLabels = {
        en: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
        fr: { days: 'Jours', hours: 'Heures', minutes: 'Minutes', seconds: 'Secondes' },
        sw: { days: 'Siku', hours: 'Saa', minutes: 'Dakika', seconds: 'Sekunde' },
        rw: { days: 'Iminsi', hours: 'Amasaha', minutes: 'Iminota', seconds: 'Amasegonda' },
    };

    languageSelect.addEventListener('change', function() {
        const lang = languageSelect.value;
        document.getElementById('daysLabel').textContent = languageLabels[lang].days;
        document.getElementById('hoursLabel').textContent = languageLabels[lang].hours;
        document.getElementById('minutesLabel').textContent = languageLabels[lang].minutes;
        document.getElementById('secondsLabel').textContent = languageLabels[lang].seconds;
    });

    // Start countdown with date validation
    datetimeInput.addEventListener('change', function() {
        clearInterval(countdownInterval);  // Clear any previous countdown
        const endDate = new Date(datetimeInput.value);
        const now = new Date();

        // Prevent user from selecting a past date
        if (endDate < now) {
            alert("Please select a future date.");
            datetimeInput.value = '';  // Reset the input field
            return;
        }

        // Countdown logic
        countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const timeRemaining = endDate - now;

            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
            } else {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                document.getElementById('days').textContent = String(days).padStart(2, '0');
                document.getElementById('hours').textContent = String(hours).padStart(2, '0');
                document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
                document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
            }
        }, 1000);
    });

    // Change background image dynamically from select option
    backgroundSelect.addEventListener('change', function() {
        countdownContainer.style.backgroundImage = this.value;
        countdownContainer.style.backgroundSize = 'cover';  // Ensure image covers
        countdownContainer.style.backgroundRepeat = 'no-repeat';  // No repeat
    });
});
