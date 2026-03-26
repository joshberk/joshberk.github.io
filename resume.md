---
layout: default
title: Resume
permalink: /resume/
---

<section class="resume-page">
  <div class="section-heading">
    <p class="section-kicker">Resume</p>
    <h1>Curriculum Vitae</h1>
    <p class="section-intro">A preview of my current CV, with direct download and full-screen viewing options.</p>
  </div>

  <div class="resume-actions">
    <a href="{{ '/assets/resume.pdf' | relative_url }}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Open PDF</a>
    <a href="{{ '/assets/resume.pdf' | relative_url }}" class="btn btn-outline" download>Download PDF</a>
  </div>

  <div class="resume-frame">
    <object data="{{ '/assets/resume.pdf' | relative_url }}" type="application/pdf" class="resume-object">
      <div class="resume-fallback">
        <p>Your browser could not display the PDF inline.</p>
        <p><a href="{{ '/assets/resume.pdf' | relative_url }}" target="_blank" rel="noopener noreferrer">Open the resume PDF directly.</a></p>
      </div>
    </object>
  </div>
</section>
