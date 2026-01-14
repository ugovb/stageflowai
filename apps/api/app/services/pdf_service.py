from fpdf import FPDF
from app.models.user import User
from app.models.skill import Skill
from typing import List
import os

class PDF(FPDF):
    def header(self):
        # Logo placeholder
        self.set_font('Helvetica', 'B', 20)
        self.cell(0, 10, 'StageFlow Resume', align='C')
        self.ln(20)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

def generate_cv_pdf(user: User, skills: List[Skill]) -> str:
    """
    Generates a PDF CV and returns the file path.
    """
    pdf = PDF()
    pdf.add_page()
    
    # --- Profile Section ---
    pdf.set_font("Helvetica", "B", 16)
    name = user.full_name or user.email.split('@')[0]
    pdf.cell(0, 10, f"Name: {name}", ln=True)
    
    pdf.set_font("Helvetica", "", 12)
    pdf.cell(0, 10, f"Email: {user.email}", ln=True)
    if user.school:
        pdf.cell(0, 10, f"School: {user.school}", ln=True)
    
    pdf.ln(10)
    
    # --- Skills Section ---
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_fill_color(200, 220, 255)
    pdf.cell(0, 10, "Validated Skills & Experiences", ln=True, fill=True)
    pdf.ln(5)
    
    pdf.set_font("Helvetica", "", 12)
    
    if not skills:
        pdf.cell(0, 10, "No validated skills yet. Chat with the coach!", ln=True)
    
    for skill in skills:
        # Skill Name
        pdf.set_font("Helvetica", "B", 12)
        pdf.cell(0, 8, f"- {skill.name} ({skill.category})", ln=True)
        
        # Evidence / Context
        evidence = skill.evidence.get("text", "") if isinstance(skill.evidence, dict) else str(skill.evidence)
        pdf.set_font("Helvetica", "I", 10)
        pdf.multi_cell(0, 5, f"  Proof: {evidence}")
        pdf.ln(3)

    # Save to /tmp or output dir
    output_dir = "generated_cvs"
    os.makedirs(output_dir, exist_ok=True)
    file_path = f"{output_dir}/cv_{user.id}.pdf"
    pdf.output(file_path)
    
    return file_path
