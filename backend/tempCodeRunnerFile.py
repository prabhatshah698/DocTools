@app.post("/compress-pdf/")
async def compress_pdf(file: UploadFile = File(...), target_size: int = Form(...)):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(400, "Only PDF allowed")

    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")
    output_path = os.path.join(PDF_DIR, f"{file_id}_compressed.pdf")

    with open(input_path, "wb") as f:
        f.write(await file.read())

    if target_size <= 200:
        quality = "/screen"
    elif target_size <= 500:
        quality = "/ebook"
    else:
        quality = "/printer"

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
        raise HTTPException(500, f"Compression error: {e}")

    return FileResponse(output_path, filename="compressed.pdf")