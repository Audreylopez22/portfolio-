document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('languageToggle');
    const languageText = document.getElementById('languageText');
    const projectsContainer = document.getElementById('projects-container');
    
    const textsToChange = document.querySelectorAll("[data-section]");

    let currentLanguage = 'es';

    const loadLanguage = (language) => {
        fetch(`${language}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                textsToChange.forEach((el) => {
                    const section = el.dataset.section;
                    const value = el.dataset.value;
                    el.innerHTML = data[section][value];
                });

                const projects = data.projects; 
                renderProjects(projects);
            })
            .catch((error) => {
                console.error("Error al cargar el archivo de idioma:", error);
            });
    };

    const renderProjects = (projects) => {
        projectsContainer.innerHTML = '';
        Object.keys(projects).forEach((key) => {
            const project = projects[key];
            projectsContainer.innerHTML += `
                <div class="col-md-4">
                    <div class="card" style="width: 100%; height: 100%;">
                        <img src="${project.imageUrl}" class="card-img-top" alt="${project.title}" />
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <p class="card-text">${project.description}</p>
                            <ul>
                                ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                            </ul>
                            <a href="${project.link}" class="btn btn-primary" target="_blank">${project.buttonText}</a>
                        </div>
                    </div>
                </div>
            `;
        });
    };

    languageToggle.addEventListener('change', () => {
        currentLanguage = languageToggle.checked ? 'en' : 'es';
        languageText.textContent = currentLanguage.toUpperCase();
        loadLanguage(currentLanguage);
    });

    loadLanguage(currentLanguage);
});
