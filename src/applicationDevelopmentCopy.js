function updateApplicationDevelopmentCTA() {
  if (window.location.pathname !== "/services/application-development") return;

  const heading = Array.from(document.querySelectorAll("main h2")).find(
    (element) => element.textContent?.trim() === "Need help with application development?",
  );

  const section = heading?.closest("section");
  if (!heading || !section) return;

  heading.textContent = "Have an application idea or operational challenge to solve?";

  const description = Array.from(section.querySelectorAll("p")).find((element) =>
    element.textContent?.trim().startsWith("Describe the property, equipment, workflow or project"),
  );

  if (description) {
    description.textContent =
      "Tell us what you want the application to accomplish, who will use it and how the work is handled today. ATS will help define the requirements, recommend a practical approach and outline the next steps.";
  }

  const button = Array.from(section.querySelectorAll("button")).find(
    (element) => element.textContent?.trim() === "Request Service",
  );

  if (button) button.textContent = "Discuss Your Application";
}

let frame = 0;

function scheduleUpdate() {
  if (frame) return;
  frame = window.requestAnimationFrame(() => {
    frame = 0;
    updateApplicationDevelopmentCTA();
  });
}

const observer = new MutationObserver(scheduleUpdate);
observer.observe(document.body, { childList: true, subtree: true });
window.addEventListener("popstate", scheduleUpdate);
scheduleUpdate();
