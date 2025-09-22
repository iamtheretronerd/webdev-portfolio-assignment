function getProjectId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

async function loadProject() {
  const projectId = getProjectId();

  if (!projectId) {
    showError();
    return;
  }

  try {
    document.getElementById("loading").style.display = "flex";
    document.getElementById("main-content").style.display = "none";
    document.getElementById("error").style.display = "none";

    // Fetch projects data
    const response = await fetch("/assets/json/projects.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const projects = await response.json();

    const project = projects.find((p) => p.id == projectId);

    if (!project) {
      showError();
      return;
    }

    populateProjectData(project);

    document.getElementById("loading").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  } catch (error) {
    console.error("Error loading project:", error);
    showError();
  }
}

function populateProjectData(project) {
  document.title = `${project.title} - Hemang Murugan`;
  document.getElementById(
    "page-title",
  ).content = `${project.title} - Hemang Murugan`;

  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-description").textContent =
    project.detailedDescription;

  const heroSection = document.getElementById("project-hero-bg");
  heroSection.style.backgroundImage = `url('${project.image}')`;

  if (project.link && project.link.trim() !== "") {
    const buttonContainer = document.getElementById("website-button-container");
    const buttonElement = document.getElementById("website-button");
    buttonElement.href = project.link;
    buttonContainer.style.display = "block";
  }

  let hasAdditionalImages = false;

  if (project.image2 && project.image2.trim() !== "") {
    const container = document.getElementById("image2-container");
    const img = document.getElementById("additional-image2");
    img.src = project.image2;
    img.alt = `${project.title} - Additional View`;
    container.style.display = "block";
    hasAdditionalImages = true;
  }

  if (project.image3 && project.image3.trim() !== "") {
    const container = document.getElementById("image3-container");
    const img = document.getElementById("additional-image3");
    img.src = project.image3;
    img.alt = `${project.title} - Additional View`;
    container.style.display = "block";
    hasAdditionalImages = true;
  }

  if (hasAdditionalImages) {
    document.getElementById("additional-images").style.display = "block";
  }
}

function showError() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("main-content").style.display = "none";
  document.getElementById("error").style.display = "flex";
}

function handleImageError(img) {
  img.style.display = "none";
  img.parentElement.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  loadProject();

  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", () => handleImageError(img));
  });
});

window.addEventListener("popstate", () => {
  loadProject();
});
