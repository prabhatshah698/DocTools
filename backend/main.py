from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from docx import Document
import pdfplumber
from pptx import Presentation
from pptx.util import Inches, Pt

import os, uuid, subprocess
import qrcode

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# ---------------- Folders ----------------
UPLOAD_DIR = "uploads"
PDF_DIR = "pdfs"
DOCX_DIR = "docx"
PPTX_DIR = "pptx"
QR_DIR = "qr_codes"

for folder in [UPLOAD_DIR, PDF_DIR, DOCX_DIR, PPTX_DIR, QR_DIR]:
    os.makedirs(folder, exist_ok=True)

# ---------------- ROOT ----------------
@app.get("/")
def home():
    return {"message": "Backend running 🚀"}

# =====================================================
# ⚡ COMMON FUNCTION (LibreOffice FAST)
# =====================================================
def libre_convert(input_path, output_dir):
    result = subprocess.run([
        r"C:\Program Files\LibreOffice\program\soffice.exe",
        "--headless",
        "--convert-to", "pdf",
        input_path,
        "--outdir", output_dir
    ], capture_output=True, text=True)

    if result.returncode != 0:
        raise Exception(result.stderr)

# =====================================================
# WORD → PDF
# =====================================================
@app.post("/word-to-pdf/")
async def word_to_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".docx"):
        raise HTTPException(400, "Only DOCX allowed")

    file_id = str(uuid.uuid4())
    input_path = os.path.abspath(os.path.join(UPLOAD_DIR, f"{file_id}.docx"))
    output_file = os.path.abspath(os.path.join(PDF_DIR, f"{file_id}.pdf"))

    with open(input_path, "wb") as f:
        f.write(await file.read())

    try:
        libre_convert(input_path, PDF_DIR)
    except Exception as e:
        raise HTTPException(500, f"Conversion error: {e}")

    if not os.path.exists(output_file):
        raise HTTPException(500, "PDF not generated")

    return FileResponse(output_file, filename="output.pdf")

# =====================================================
# PPT → PDF
# =====================================================
@app.post("/ppt-to-pdf/")
async def ppt_to_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".pptx"):
        raise HTTPException(400, "Only PPTX allowed")

    file_id = str(uuid.uuid4())
    input_path = os.path.abspath(os.path.join(UPLOAD_DIR, f"{file_id}.pptx"))
    output_file = os.path.abspath(os.path.join(PDF_DIR, f"{file_id}.pdf"))

    with open(input_path, "wb") as f:
        f.write(await file.read())

    try:
        libre_convert(input_path, PDF_DIR)
    except Exception as e:
        raise HTTPException(500, f"PPT → PDF error: {e}")

    if not os.path.exists(output_file):
        raise HTTPException(500, "PDF not generated")

    return FileResponse(output_file, filename="output.pdf")

# =====================================================
# PDF → WORD
# =====================================================
@app.post("/pdf-to-word/")
async def pdf_to_word(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(400, "Only PDF allowed")

    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")
    output_path = os.path.join(DOCX_DIR, f"{file_id}.docx")

    with open(input_path, "wb") as f:
        f.write(await file.read())

    try:
        doc = Document()

        with pdfplumber.open(input_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    doc.add_paragraph(text)

        doc.save(output_path)

    except Exception as e:
        raise HTTPException(500, f"PDF → Word error: {e}")

    return FileResponse(output_path, filename="output.docx")

# =====================================================
# PDF → PPT
# =====================================================
@app.post("/pdf-to-ppt/")
async def pdf_to_ppt(file: UploadFile = File(...)):

    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")
    output_path = os.path.join(PPTX_DIR, f"{file_id}.pptx")

    with open(input_path, "wb") as f:
        f.write(await file.read())

    try:
        prs = Presentation()

        with pdfplumber.open(input_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    slide = prs.slides.add_slide(prs.slide_layouts[1])
                    box = slide.shapes.add_textbox(Inches(1), Inches(1), Inches(8), Inches(5))
                    tf = box.text_frame

                    for line in text.split("\n"):
                        p = tf.add_paragraph()
                        p.text = line
                        p.font.size = Pt(16)

        prs.save(output_path)

    except Exception as e:
        raise HTTPException(500, f"PDF → PPT error: {e}")

    return FileResponse(output_path, filename="output.pptx")

# =====================================================
# WORD → PPT
# =====================================================
@app.post("/word-to-ppt/")
async def word_to_ppt(file: UploadFile = File(...)):

    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}.docx")
    output_path = os.path.join(PPTX_DIR, f"{file_id}.pptx")

    with open(input_path, "wb") as f:
        f.write(await file.read())

    try:
        doc = Document(input_path)
        prs = Presentation()

        for para in doc.paragraphs:
            if para.text.strip():
                slide = prs.slides.add_slide(prs.slide_layouts[1])
                slide.shapes.title.text = "Slide"
                slide.placeholders[1].text = para.text

        prs.save(output_path)

    except Exception as e:
        raise HTTPException(500, f"Word → PPT error: {e}")

    return FileResponse(output_path, filename="output.pptx")

# =====================================================
# PPT → WORD
# =====================================================
@app.post("/ppt-to-word/")
async def ppt_to_word(file: UploadFile = File(...)):

    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}.pptx")
    output_path = os.path.join(DOCX_DIR, f"{file_id}.docx")

    with open(input_path, "wb") as f:
        f.write(await file.read())

    try:
        prs = Presentation(input_path)
        doc = Document()

        for i, slide in enumerate(prs.slides):
            doc.add_heading(f"Slide {i+1}", level=1)
            for shape in slide.shapes:
                if hasattr(shape, "text") and shape.text.strip():
                    doc.add_paragraph(shape.text)

        doc.save(output_path)

    except Exception as e:
        raise HTTPException(500, f"PPT → Word error: {e}")

    return FileResponse(output_path, filename="output.docx")

# =====================================================
# QR CODE
# =====================================================
@app.post("/generate-qr/")
async def generate_qr(data: str = Form(...)):

    file_id = str(uuid.uuid4())
    output_path = os.path.join(QR_DIR, f"{file_id}.png")

    img = qrcode.make(data)
    img.save(output_path)

    return FileResponse(output_path, filename="qrcode.png")

# =====================================================
# PDF COMPRESSOR
# =====================================================
@app.post("/compress-pdf/")
async def compress_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF allowed")

    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")
    output_path = os.path.join(PDF_DIR, f"{file_id}_compressed.pdf")

    # Save uploaded file
    with open(input_path, "wb") as f:
        f.write(await file.read())

    # Fixed compression level (optimized for most use cases)
    quality = "/ebook"

    try:
        subprocess.run([
            r"C:\Program Files\gs\gs10.07.0\bin\gswin64c.exe",
            "-sDEVICE=pdfwrite",
            "-dCompatibilityLevel=1.4",
            f"-dPDFSETTINGS={quality}",
            "-dNOPAUSE",
            "-dQUIET",
            "-dBATCH",
            f"-sOutputFile={output_path}",
            input_path
        ], check=True)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Compression error: {str(e)}")

    return FileResponse(output_path, filename="compressed.pdf")