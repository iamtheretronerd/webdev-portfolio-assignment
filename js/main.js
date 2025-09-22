function loadExperiences() {
  const experienceList = document.getElementById("experience-list");

  fetch("assets/json/experiences.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((exp) => {
        experienceList.appendChild(createExperienceBox(exp));
      });
    })
    .catch((error) => {
      console.error("Error loading experiences:", error);
      experienceList.innerHTML = "<p>Error loading. Please try again.</p>";
    });
}

function createExperienceBox(experience) {
  const box = document.createElement("div");
  box.className = "experience-box";

  box.innerHTML = `
                <div class="experience-header">
                    <h3 class="company-name">${experience.company}</h3>
                    <span class="experience-date">${experience.date}</span>
                </div>
                <p class="experience-description">${experience.description}</p>
            `;

  return box;
}

document.addEventListener("DOMContentLoaded", () => {
  loadExperiences();
  loadProjects();
});

function loadProjects() {
  const projectsGrid = document.getElementById("projects-grid");

  fetch("assets/json/projects.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((project) => {
        projectsGrid.appendChild(createProjectCard(project));
      });
    })
    .catch((error) => {
      console.error("Error loading projects:", error);
      projectsGrid.innerHTML =
        "<p>Error loading projects. Please try again later.</p>";
    });
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";
  card.setAttribute("data-project-id", project.id);

  card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                </div>
            `;

  card.addEventListener("click", () => {
    window.location.href = `/project.html?id=${project.id}`;
  });

  return card;
}

// Parallax effect for hero section
const middleLayer = document.querySelector(".middle-layer");
const topLayer = document.querySelector(".image-overlay");
const heroSection = document.querySelector(".hero-section");

const initialTransform = "translateX(-50%)";

heroSection.addEventListener("mousemove", (e) => {
  const rect = heroSection.getBoundingClientRect();

  const mouseX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
  const mouseY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

  const middleMoveX = -mouseX * 30;
  const middleMoveY = -mouseY * 10;

  const topMoveX = -mouseX * 50;
  const topMoveY = -mouseY * 20;

  middleLayer.style.transform = `translateX(calc(-50% + ${middleMoveX}px)) translateY(${middleMoveY}px)`;
  topLayer.style.transform = `translateX(calc(-50% + ${topMoveX}px)) translateY(${topMoveY}px)`;
});

heroSection.addEventListener("mouseleave", () => {
  middleLayer.style.transform = initialTransform;
  topLayer.style.transform = initialTransform;
});
