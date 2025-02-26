export function downloadResume() {
  const link = document.createElement("a");
  link.href = "/Andrew Kolumbic - Resume.docx"; // Update with the actual path to the resume
  link.download = "Andrew Kolumbic - Resume.docx"; // Update with the desired file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
