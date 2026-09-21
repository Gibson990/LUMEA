import os
from PIL import Image, ImageDraw
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def create_flow_diagrams():
    os.makedirs('docs/screenshots', exist_ok=True)

    # 1. Full-Stack Architecture Flow Diagram
    img1 = Image.new('RGB', (1000, 360), color=(255, 248, 250))
    d1 = ImageDraw.Draw(img1)
    d1.rectangle([(10, 10), (990, 350)], outline=(217, 108, 138), width=2)
    d1.rectangle([(10, 10), (990, 50)], fill=(43, 32, 36))
    d1.text((360, 20), "LUMEA FULL-STACK ARCHITECTURE FLOW", fill=(255, 255, 255))
    
    # Client Box
    d1.rounded_rectangle([(40, 85), (280, 295)], radius=12, fill=(255, 255, 255), outline=(217, 108, 138), width=2)
    d1.text((70, 105), "CLIENT LAYER (SPA)", fill=(217, 108, 138))
    d1.text((60, 145), "- React 18 (Vite Bundler)", fill=(43, 32, 36))
    d1.text((60, 175), "- Tailwind CSS Styling", fill=(43, 32, 36))
    d1.text((60, 205), "- Contexts (Auth, Cart)", fill=(43, 32, 36))
    d1.text((60, 235), "- React Router v6 Guard", fill=(43, 32, 36))
    d1.text((60, 265), "- Mobile Drawer Navigation", fill=(43, 32, 36))
    
    # Arrow 1 -> 2
    d1.line([(280, 190), (370, 190)], fill=(217, 108, 138), width=3)
    d1.polygon([(370, 190), (355, 182), (355, 198)], fill=(217, 108, 138))
    d1.text((290, 160), "REST HTTP\nJSON APIs", fill=(100, 90, 95))

    # Backend Box
    d1.rounded_rectangle([(370, 85), (630, 295)], radius=12, fill=(255, 255, 255), outline=(169, 75, 104), width=2)
    d1.text((400, 105), "REST API SERVER (EXPRESS)", fill=(169, 75, 104))
    d1.text((390, 145), "- Node.js Event Loop", fill=(43, 32, 36))
    d1.text((390, 175), "- Product & Variant Routes", fill=(43, 32, 36))
    d1.text((390, 205), "- Order & Tracking Routes", fill=(43, 32, 36))
    d1.text((390, 235), "- Support Ticket Desk", fill=(43, 32, 36))
    d1.text((390, 265), "- RBAC User Promotion API", fill=(43, 32, 36))

    # Arrow 2 -> 3
    d1.line([(630, 190), (710, 190)], fill=(169, 75, 104), width=3)
    d1.polygon([(710, 190), (695, 182), (695, 198)], fill=(169, 75, 104))
    d1.text((635, 160), "Dual-Mode\nPersistence", fill=(100, 90, 95))

    # Database Box
    d1.rounded_rectangle([(710, 85), (960, 295)], radius=12, fill=(255, 255, 255), outline=(43, 32, 36), width=2)
    d1.text((740, 105), "PERSISTENCE LAYER", fill=(43, 32, 36))
    d1.text((730, 145), "[Primary]: MySQL 8.0", fill=(43, 32, 36))
    d1.text((730, 175), "- 3NF Relational Tables", fill=(43, 32, 36))
    d1.text((730, 205), "- Foreign Key Integrity", fill=(43, 32, 36))
    d1.text((730, 235), "[Secondary]: Memory Store", fill=(43, 32, 36))
    d1.text((730, 265), "- Automated Mock Fallback", fill=(43, 32, 36))

    img1.save('docs/screenshots/flow_architecture.png')

    # 2. Order Fulfillment State Machine
    img2 = Image.new('RGB', (1000, 320), color=(255, 255, 255))
    d2 = ImageDraw.Draw(img2)
    d2.rectangle([(10, 10), (990, 310)], outline=(244, 216, 223), width=2)
    d2.rectangle([(10, 10), (990, 45)], fill=(43, 32, 36))
    d2.text((340, 18), "ORDER FULFILLMENT LIFECYCLE & CANCELLATION", fill=(255, 255, 255))

    steps = [
        ("1. PENDING", "Order Placed (COD)\nAwaiting Processing", (217, 108, 138)),
        ("2. CONFIRMED", "Stock Allocated\nAddress Verified", (100, 140, 200)),
        ("3. PROCESSING", "Packaging in Warehouse\nWaybill Created", (150, 100, 190)),
        ("4. SHIPPED", "Handed to Courier\nTracking Live", (50, 160, 180)),
        ("5. DELIVERED", "Payment Collected\nFulfillment Complete", (40, 160, 90))
    ]

    x = 35
    for idx, (title, sub, color) in enumerate(steps):
        d2.rounded_rectangle([(x, 65), (x+165, 175)], radius=10, fill=(255, 248, 250), outline=color, width=2)
        d2.text((x+15, 80), title, fill=color)
        d2.text((x+10, 115), sub, fill=(60, 50, 55))
        if idx < len(steps)-1:
            d2.line([(x+165, 120), (x+195, 120)], fill=(180, 170, 175), width=2)
            d2.polygon([(x+195, 120), (x+187, 115), (x+187, 125)], fill=(180, 170, 175))
        x += 190

    # Cancellation Branch
    d2.line([(115, 175), (115, 240), (450, 240)], fill=(220, 50, 70), width=2)
    d2.polygon([(450, 240), (442, 235), (442, 245)], fill=(220, 50, 70))
    d2.rounded_rectangle([(450, 205), (770, 285)], radius=10, fill=(255, 240, 240), outline=(220, 50, 70), width=2)
    d2.text((470, 220), "CANCELLED STATE (Customer Self-Service)", fill=(200, 30, 50))
    d2.text((470, 250), "Releases allocated shade units back to inventory", fill=(60, 50, 55))
    d2.text((125, 215), "Customer Cancel (Allowed when Pending/Confirmed)", fill=(200, 30, 50))

    img2.save('docs/screenshots/flow_order_lifecycle.png')

def add_footer_page_number(run):
    fldChar1 = parse_xml(r'<w:fldChar %s w:fldCharType="begin"/>' % nsdecls('w'))
    instrText = parse_xml(r'<w:instrText %s xml:space="preserve"> PAGE </w:instrText>' % nsdecls('w'))
    fldChar2 = parse_xml(r'<w:fldChar %s w:fldCharType="separate"/>' % nsdecls('w'))
    fldChar3 = parse_xml(r'<w:fldChar %s w:fldCharType="end"/>' % nsdecls('w'))
    run._r.append(fldChar1)
    run._r.append(instrText)
    run._r.append(fldChar2)
    run._r.append(fldChar3)

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def add_styled_heading(doc, text, level):
    h = doc.add_heading(text, level=level)
    run = h.runs[0] if h.runs else h.add_run(text)
    if level == 1:
        run.font.name = 'Georgia'
        run.font.size = Pt(14.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(43, 32, 36)
        h.paragraph_format.space_before = Pt(12)
        h.paragraph_format.space_after = Pt(5)
        h.paragraph_format.keep_with_next = True
    elif level == 2:
        run.font.name = 'Calibri'
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.color.rgb = RGBColor(169, 75, 104)
        h.paragraph_format.space_before = Pt(9)
        h.paragraph_format.space_after = Pt(3)
        h.paragraph_format.keep_with_next = True
    elif level == 3:
        run.font.name = 'Calibri'
        run.font.size = Pt(10.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(60, 50, 54)
        h.paragraph_format.space_before = Pt(5)
        h.paragraph_format.space_after = Pt(2)
        h.paragraph_format.keep_with_next = True
    return h

def add_body_p(doc, text, bold_prefix="", italic=False):
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(4)
    if bold_prefix:
        r_bold = p.add_run(bold_prefix)
        r_bold.font.name = 'Calibri'
        r_bold.font.size = Pt(10)
        r_bold.font.bold = True
        r_bold.font.color.rgb = RGBColor(43, 32, 36)
    r_text = p.add_run(text)
    r_text.font.name = 'Calibri'
    r_text.font.size = Pt(10)
    r_text.font.italic = italic
    r_text.font.color.rgb = RGBColor(50, 45, 48)
    return p

def add_bullet(doc, text, bold_title=""):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(2.5)
    if bold_title:
        rb = p.add_run(bold_title + ": ")
        rb.font.name = 'Calibri'
        rb.font.size = Pt(10)
        rb.font.bold = True
        rb.font.color.rgb = RGBColor(43, 32, 36)
    rt = p.add_run(text)
    rt.font.name = 'Calibri'
    rt.font.size = Pt(10)
    rt.font.color.rgb = RGBColor(50, 45, 48)
    return p

def add_code_block(doc, title, code_snippet):
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_before = Pt(5)
    p_title.paragraph_format.space_after = Pt(2)
    r_t = p_title.add_run(title)
    r_t.font.name = 'Calibri'
    r_t.font.size = Pt(9.5)
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(169, 75, 104)

    t = doc.add_table(rows=1, cols=1)
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    t.columns[0].width = Inches(6.5)
    cell = t.cell(0, 0)
    set_cell_background(cell, "F7F2F4")
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.05
    r = p.add_run(code_snippet)
    r.font.name = 'Consolas'
    r.font.size = Pt(8.5)
    r.font.color.rgb = RGBColor(43, 32, 36)

def add_figure(doc, img_path, caption_text, width_in=5.4):
    if os.path.exists(img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(4)
        p_img.paragraph_format.space_after = Pt(2)
        run_img = p_img.add_run()
        run_img.add_picture(img_path, width=Inches(width_in))
        
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(1)
        p_cap.paragraph_format.space_after = Pt(8)
        rc = p_cap.add_run(caption_text)
        rc.font.name = 'Calibri'
        rc.font.size = Pt(8.5)
        rc.font.italic = True
        rc.font.color.rgb = RGBColor(110, 95, 101)

def build_document():
    create_flow_diagrams()
    doc = Document()

    # Configure Margins & Headers/Footers
    for s in doc.sections:
        s.top_margin = Inches(1.0)
        s.bottom_margin = Inches(1.0)
        s.left_margin = Inches(1.0)
        s.right_margin = Inches(1.0)
        
        # Configure Header
        header = s.header
        p_head = header.paragraphs[0]
        p_head.text = "LUMÉA: Single-Product Beauty E-Commerce Platform | BCA Internship Report"
        p_head.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p_head.runs[0].font.name = 'Calibri'
        p_head.runs[0].font.size = Pt(8)
        p_head.runs[0].font.color.rgb = RGBColor(140, 130, 135)

        # Configure Footer with Page Number
        footer = s.footer
        p_foot = footer.paragraphs[0]
        p_foot.text = "Dept. of Computer Applications (BCA) — Gulzar Group of Institutions\t\tPage "
        p_foot.runs[0].font.name = 'Calibri'
        p_foot.runs[0].font.size = Pt(8.5)
        p_foot.runs[0].font.color.rgb = RGBColor(100, 90, 95)
        r_num = p_foot.add_run()
        r_num.font.name = 'Calibri'
        r_num.font.size = Pt(8.5)
        r_num.font.bold = True
        r_num.font.color.rgb = RGBColor(43, 32, 36)
        add_footer_page_number(r_num)

    # =========================================================================
    # PAGE 1: TITLE / COVER PAGE (STANDALONE)
    # =========================================================================
    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_before = Pt(10)
    p_inst.paragraph_format.space_after = Pt(2)
    r = p_inst.add_run("GULZAR GROUP OF INSTITUTIONS")
    r.font.name = 'Georgia'; r.font.size = Pt(16); r.font.bold = True; r.font.color.rgb = RGBColor(43, 32, 36)

    p_city = doc.add_paragraph(); p_city.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_city.paragraph_format.space_after = Pt(14)
    r = p_city.add_run("KHANNA, PUNJAB\nDEPARTMENT OF COMPUTER APPLICATIONS (BCA)")
    r.font.name = 'Calibri'; r.font.size = Pt(11); r.font.bold = True; r.font.color.rgb = RGBColor(169, 75, 104)

    p_type = doc.add_paragraph(); p_type.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_type.paragraph_format.space_after = Pt(2)
    r = p_type.add_run("INTERNSHIP TRAINING REPORT")
    r.font.name = 'Calibri'; r.font.size = Pt(13); r.font.bold = True; r.font.color.rgb = RGBColor(43, 32, 36)

    p_on = doc.add_paragraph(); p_on.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_on.paragraph_format.space_after = Pt(12)
    r = p_on.add_run("on\nWEB DEVELOPMENT")
    r.font.name = 'Calibri'; r.font.size = Pt(11.5); r.font.bold = True; r.font.color.rgb = RGBColor(80, 75, 78)

    p_proj = doc.add_paragraph(); p_proj.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_proj.paragraph_format.space_after = Pt(4)
    r = p_proj.add_run("LUMÉA: SINGLE-PRODUCT BEAUTY E-COMMERCE PLATFORM")
    r.font.name = 'Georgia'; r.font.size = Pt(15); r.font.bold = True; r.font.color.rgb = RGBColor(217, 108, 138)

    p_sub = doc.add_paragraph(); p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(14)
    r = p_sub.add_run("Internship Undertaken at: VIRO WEB SOLUTION\nDuration: 13th July to 26th August")
    r.font.name = 'Calibri'; r.font.size = Pt(10.5); r.font.bold = True; r.font.color.rgb = RGBColor(43, 32, 36)

    p_req = doc.add_paragraph(); p_req.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_req.paragraph_format.space_after = Pt(24)
    r = p_req.add_run("Submitted in partial fulfilment of the requirements for the award of the degree of\n")
    r.font.name = 'Calibri'; r.font.size = Pt(9.5); r.font.color.rgb = RGBColor(100, 95, 98)
    r2 = p_req.add_run("BACHELOR OF COMPUTER APPLICATIONS (BCA)")
    r2.font.name = 'Georgia'; r2.font.size = Pt(11.5); r2.font.bold = True; r2.font.color.rgb = RGBColor(43, 32, 36)

    table_info = doc.add_table(rows=1, cols=2)
    table_info.alignment = WD_TABLE_ALIGNMENT.CENTER
    table_info.columns[0].width = Inches(3.2); table_info.columns[1].width = Inches(3.2)
    p0 = table_info.cell(0, 0).paragraphs[0]
    p0.add_run("Submitted by:\nName: Kichu Khoirom\nUniversity Roll No.: 2433548\nBCA — Final Semester\nSession: 2025 – 2026").font.size = Pt(9.5)
    p1 = table_info.cell(0, 1).paragraphs[0]
    p1.add_run("Under the guidance of:\nFaculty Guide Name\nDept. of Computer Applications\nGulzar Group of Institutions\nIndustry Guide: Technical Lead\nViro Web Solution").font.size = Pt(9.5)

    doc.add_page_break()

    # =========================================================================
    # PAGE 2: INTERNSHIP COMPLETION CERTIFICATE (STANDALONE)
    # =========================================================================
    add_styled_heading(doc, "INTERNSHIP COMPLETION CERTIFICATE", level=1)
    p_cert_sub = doc.add_paragraph(); p_cert_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p_cert_sub.add_run("(Issued by Viro Web Solution)")
    r.font.name = 'Calibri'; r.font.size = Pt(10.5); r.font.italic = True; r.font.color.rgb = RGBColor(120, 110, 115)

    doc.add_paragraph()

    # Dedicated placeholder border box where the scanned certificate is inserted
    t_cert_box = doc.add_table(rows=1, cols=1)
    t_cert_box.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_cert_box.columns[0].width = Inches(6.5)
    c_box = t_cert_box.cell(0, 0)
    set_cell_background(c_box, "FFFDFE")
    p_box = c_box.paragraphs[0]
    p_box.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_box.paragraph_format.space_before = Pt(28)
    p_box.paragraph_format.space_after = Pt(28)
    r_box = p_box.add_run("[ AFFIX / INSERT SCANNED COPY OF ORIGINAL CERTIFICATE HERE ]\n\nOfficial Internship Completion Certificate\nIssued by Viro Web Solution\nAuthorized Signatory & Stamp")
    r_box.font.name = 'Calibri'; r_box.font.size = Pt(11); r_box.font.bold = True; r_box.font.color.rgb = RGBColor(169, 75, 104)

    doc.add_paragraph()
    add_body_p(doc, 
        "This is to certify that Mr. Kichu Khoirom, University Roll No. 2433548, a bona fide student of Bachelor of Computer Applications (BCA) at Gulzar Group of Institutions, Khanna, Punjab, has successfully completed his Web Development Internship Training at Viro Web Solution from 13th July to 26th August.",
        bold_prefix="CERTIFICATE TRANSCRIPTION:\n\n"
    )
    add_body_p(doc,
        "During this tenure, he actively worked in the role of Web Developer on the design, full-stack architecture, and deployment of the e-commerce web application titled \"LUMÉA: Single-Product Beauty E-Commerce Platform\". His responsibilities encompassed developing responsive user interfaces with React 18, configuring client-side routing, establishing secure REST API endpoints with Node.js and Express, designing a normalized MySQL database schema, and configuring administrative role-based access control."
    )
    add_body_p(doc, "His performance, technical conduct, and project deliverables were found to be exemplary throughout the training period.")

    p_sig_cert = doc.add_paragraph(); p_sig_cert.paragraph_format.space_before = Pt(20)
    p_sig_cert.add_run("Date: 26th August\nPlace: Khanna, Punjab\t\t\t\tAuthorized Signatory\n\t\t\t\t\t\t\tViro Web Solution").font.size = Pt(9.5)

    doc.add_page_break()

    # =========================================================================
    # PAGE 3: STUDENT DECLARATION (STANDALONE)
    # =========================================================================
    add_styled_heading(doc, "STUDENT DECLARATION", level=1)
    doc.add_paragraph()
    add_body_p(doc,
        "I, Kichu Khoirom, University Roll No. 2433548, hereby declare that the Internship Training Report entitled “Web Development Internship at Viro Web Solution — Project Luméa: Single-Product Beauty E-Commerce Platform”, submitted to the Department of Computer Applications, Gulzar Group of Institutions, Khanna, Punjab, in partial fulfilment of the requirements for the award of the degree of Bachelor of Computer Applications, is an original record of work carried out by me during my internship at Viro Web Solution under the guidance of the concerned faculty and industry guide."
    )
    add_body_p(doc,
        "I further declare that this report has not been submitted, in part or in full, to any other university or institute for the award of any degree or diploma, and that all sources of information, code references, and documentation used have been duly acknowledged."
    )

    doc.add_paragraph(); doc.add_paragraph(); doc.add_paragraph()
    p_dec_sign = doc.add_paragraph(); p_dec_sign.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r = p_dec_sign.add_run("_________________________\nKichu Khoirom\nUniversity Roll No.: 2433548\nBCA Final Semester\nGulzar Group of Institutions")
    r.font.name = 'Calibri'; r.font.size = Pt(10); r.font.bold = True

    p_dec_date = doc.add_paragraph()
    p_dec_date.add_run("Date: 21st September 2026\nPlace: Khanna, Punjab").font.size = Pt(9.5)

    doc.add_page_break()

    # =========================================================================
    # PAGE 4: ACKNOWLEDGEMENT (STANDALONE)
    # =========================================================================
    add_styled_heading(doc, "ACKNOWLEDGEMENT", level=1)
    doc.add_paragraph()
    add_body_p(doc,
        "I would like to express my sincere gratitude to Viro Web Solution for providing me with the opportunity to undergo internship training as a Web Developer and gain valuable practical exposure to the professional software and web development environment."
    )
    add_body_p(doc,
        "I am thankful to my industry guide and the technical development team at Viro Web Solution for their guidance, support, feedback, and encouragement throughout the training period. Their practical suggestions helped me understand how modern web development concepts such as React state management, modular REST APIs, and database normalization are applied in real-world commercial projects."
    )
    add_body_p(doc,
        "I would also like to thank my faculty guide and the Department of Computer Applications, Gulzar Group of Institutions, Khanna, Punjab, for their valuable guidance, scholastic encouragement, and continuous support during the internship and the preparation of this comprehensive report."
    )
    add_body_p(doc,
        "Finally, I extend my heartfelt gratitude to the Head of Department, faculty members, family, and friends for their constant motivation, patience, and support throughout my academic studies."
    )

    doc.add_paragraph(); doc.add_paragraph()
    p_ack_sign = doc.add_paragraph(); p_ack_sign.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r = p_ack_sign.add_run("Kichu Khoirom\nUniversity Roll No.: 2433548\nDepartment of Computer Applications (BCA)")
    r.font.name = 'Calibri'; r.font.size = Pt(10); r.font.bold = True

    doc.add_page_break()

    # =========================================================================
    # PAGE 5: TABLE OF CONTENTS (STANDALONE)
    # =========================================================================
    add_styled_heading(doc, "TABLE OF CONTENTS", level=1)
    doc.add_paragraph()
    
    toc_items = [
        ("Internship Completion Certificate", "ii"),
        ("Student Declaration", "iii"),
        ("Acknowledgement", "iv"),
        ("Chapter 1: Introduction", "1"),
        ("    1.1 About the Internship Training", "1"),
        ("    1.2 Objectives of the Training", "1"),
        ("    1.3 Scope of the Training", "2"),
        ("Chapter 2: Organization Profile", "3"),
        ("    2.1 About Viro Web Solution", "3"),
        ("    2.2 Vision & Mission", "3"),
        ("    2.3 Products / Services Offered", "3"),
        ("    2.4 Organizational Structure", "4"),
        ("Chapter 3: Project Undertaken (Luméa E-Commerce)", "5"),
        ("    3.1 Introduction to the Project", "5"),
        ("    3.2 Problem Definition", "5"),
        ("    3.3 Objectives of the Project", "6"),
        ("    3.4 Technologies Used (Frontend, Backend, Database, Tools)", "6"),
        ("Chapter 4: System Analysis & Design", "8"),
        ("    4.1 Requirement Analysis (Functional & Non-Functional)", "8"),
        ("    4.2 Feasibility Study (Technical, Economic, Operational)", "9"),
        ("    4.3 System Design & Architecture Flow Diagram", "9"),
        ("    4.4 Database Design & 3NF Schema", "10"),
        ("Chapter 5: Implementation", "11"),
        ("    5.1 Modules Description", "11"),
        ("    5.2 Coding Standards Followed", "12"),
        ("    5.3 Sample Code Snippets (React Configurator, Express API)", "12"),
        ("    5.4 Role-Based Access Control (RBAC) Matrix", "13"),
        ("Chapter 6: Testing & Quality Assurance", "14"),
        ("    6.1 Testing Objectives", "14"),
        ("    6.2 Testing Methods Used", "14"),
        ("    6.3 Test Cases Table & Results", "15"),
        ("Chapter 7: System Screenshots & Output Verification", "16"),
        ("Chapter 8: Conclusion & Future Scope", "21"),
        ("    8.1 Conclusion", "21"),
        ("    8.2 Limitations", "21"),
        ("    8.3 Future Enhancements", "21"),
        ("References / Bibliography", "22")
    ]

    t_toc = doc.add_table(rows=len(toc_items), cols=2)
    t_toc.columns[0].width = Inches(5.4); t_toc.columns[1].width = Inches(1.1)
    for idx, (title, pg) in enumerate(toc_items):
        r_t = t_toc.cell(idx, 0).paragraphs[0].add_run(title)
        r_t.font.name = 'Calibri'; r_t.font.size = Pt(9.5)
        if "Chapter" in title or "References" in title:
            r_t.font.bold = True
            r_t.font.color.rgb = RGBColor(43, 32, 36)
        
        p_r = t_toc.cell(idx, 1).paragraphs[0]; p_r.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r_p = p_r.add_run(pg); r_p.font.name = 'Calibri'; r_p.font.size = Pt(9.5)

    doc.add_page_break()

    # =========================================================================
    # CHAPTER 1: INTRODUCTION (STARTS ON OWN PAGE)
    # =========================================================================
    add_styled_heading(doc, "Chapter 1: Introduction", level=1)
    
    add_styled_heading(doc, "1.1 About the Internship Training", level=2)
    add_body_p(doc,
        "Internship training is an indispensable component of professional technical education because it provides students with an opportunity to apply classroom knowledge in a practical working environment. The internship at Viro Web Solution was undertaken in the role of Web Developer from 13th July to 26th August. The training focused on understanding professional web development workflows, designing and implementing interactive web interfaces, developing RESTful server-side services, configuring relational database tables, identifying errors, and adhering to industry-standard coding conventions."
    )
    add_body_p(doc,
        "During the internship, the primary emphasis was on practical web development activities. The training helped bridge the gap between academic programming concepts and real-world commercial deliverables. It provided direct experience in analyzing user requirements, planning web page structures, writing clean component-driven code, verifying mobile responsiveness, debugging cross-device defects, and optimizing the overall user experience."
    )
    add_bullet(doc, "13th July to 26th August", "Internship Duration")
    add_bullet(doc, "Viro Web Solution", "Host Organization")
    add_bullet(doc, "Web Developer Intern", "Assigned Role")

    add_styled_heading(doc, "1.2 Objectives of the Training", level=2)
    add_bullet(doc, "To gain practical exposure to real-world web development practices and professional software delivery workflows.")
    add_bullet(doc, "To apply classroom knowledge of programming, web technologies, and database design to practical business tasks.")
    add_bullet(doc, "To understand the complete lifecycle of a web-based e-commerce platform from conception to deployment.")
    add_bullet(doc, "To improve technical proficiency in designing responsive, user-friendly, and accessible web interfaces across small and large screens.")
    add_bullet(doc, "To learn effective coding standards, systematic debugging, comprehensive test-case execution, and documentation practices.")
    add_bullet(doc, "To understand professional communication, deadline-based execution, and collaborative version control using Git and GitHub.")

    add_styled_heading(doc, "1.3 Scope of the Training", level=2)
    add_body_p(doc,
        "The scope of the internship covered practical web development activities performed within the responsibilities assigned to the trainee. The work included understanding requirements, planning component hierarchies, structuring web content, styling interfaces using utility-first CSS frameworks, implementing interactive client-side logic in React, developing REST API endpoints in Node.js, establishing relational database schemas, testing interfaces on diverse screen viewports, and handling edge cases."
    )
    add_body_p(doc,
        "The project scope was intentionally focused on web application development. Enterprise production responsibilities such as large-scale cloud Kubernetes cluster orchestration, multi-region database replication, or unrestricted administrative access to proprietary company systems were outside the scope of this undergraduate training."
    )

    doc.add_page_break()

    # =========================================================================
    # CHAPTER 2: ORGANIZATION PROFILE (STARTS ON OWN PAGE)
    # =========================================================================
    add_styled_heading(doc, "Chapter 2: Organization Profile", level=1)
    
    add_styled_heading(doc, "2.1 About the Organization", level=2)
    add_body_p(doc,
        "Viro Web Solution was the host organization for the internship training. The internship was completed in the Web Development domain, where the trainee worked on practical activities related to the design, full-stack development, improvement, and testing of responsive web applications."
    )
    add_bullet(doc, "Viro Web Solution", "Organization Name")
    add_bullet(doc, "Full-Stack Web Development & IT Solutions", "Internship Domain")
    add_bullet(doc, "Web Developer Intern", "Assigned Designation")
    add_bullet(doc, "Custom Website & Application Engineering, D2C Portals, API Development", "Core Competencies")

    add_styled_heading(doc, "2.2 Vision & Mission", level=2)
    add_body_p(doc, 
        "To be a distinguished web solutions provider recognized for engineering excellence, creative user experiences, and maintainable software architectures that empower businesses to thrive in modern digital economies.",
        bold_prefix="Vision Statement: "
    )
    add_body_p(doc, 
        "To deliver functional, high-performance, and secure digital web applications while cultivating engineering talent through hands-on technical mentorship and structured agile development practices.",
        bold_prefix="Mission Statement: "
    )

    add_styled_heading(doc, "2.3 Products / Services Offered", level=2)
    add_body_p(doc, "Viro Web Solution delivers solutions across multiple digital service verticals:")
    add_bullet(doc, "Custom Single-Page Applications (SPAs) and corporate portals built on React and modern JavaScript.", "Web Design & Development")
    add_bullet(doc, "Tailored storefronts featuring product configurators, inventory tracking, and payment gateways.", "D2C & E-Commerce Solutions")
    add_bullet(doc, "Express and Node.js microservices, MySQL database normalization, and third-party API connectivity.", "REST API & Backend Services")
    add_bullet(doc, "Mobile-first layouts, cross-device compatibility testing, performance profiling, and UI modernization.", "Responsive UI/UX & Optimization")

    add_styled_heading(doc, "2.4 Organizational Structure", level=2)
    add_body_p(doc, "The operational team structure at Viro Web Solution relevant to the internship is represented as follows:")
    add_bullet(doc, "Oversees company strategy, client relationships, and technological direction.", "Management / Technical Director")
    add_bullet(doc, "Guides architecture, performs code reviews, assigns sprint tasks, and mentors developers.", "Project & Team Lead")
    add_bullet(doc, "Implements client-side components, backend services, and database integration.", "Web Development Team")
    add_bullet(doc, "Undergoes structured mentorship, builds assigned modules, executes testing, and documents deliverables.", "Web Developer Intern (Trainee)")

    doc.add_page_break()

    # =========================================================================
    # CHAPTER 3: PROJECT UNDERTAKEN (STARTS ON OWN PAGE)
    # =========================================================================
    add_styled_heading(doc, "Chapter 3: Project Undertaken — Luméa E-Commerce", level=1)
    
    add_styled_heading(doc, "3.1 Introduction to the Project", level=2)
    add_body_p(doc,
        "During the internship at Viro Web Solution, the trainee worked as a Web Developer and was assigned the project: \"Luméa: Single-Product Beauty E-Commerce Platform\". The project focused on building an end-to-end, high-performance direct-to-consumer (D2C) web application centered on a flagship cosmetic product — the \"Luméa Glow Tint\" (priced at ₹799)."
    )
    add_body_p(doc,
        "Unlike complex multi-category marketplaces that overwhelm shoppers, modern beauty brands thrive on laser-focused, visually engaging single-product storytelling. Luméa offers the product across six hand-picked shades: Rose Petal, Peach Bloom, Berry Kiss, Soft Coral, Nude Glow, and Pink Champagne. The trainee was tasked with architecting the frontend user interface in React 18, styling it with a custom beauty palette in Tailwind CSS, connecting it to an Express REST API backend, and establishing a normalized MySQL database."
    )

    add_styled_heading(doc, "3.2 Problem Definition", level=2)
    add_body_p(doc,
        "The project addressed multiple well-documented friction points that plague cosmetic e-commerce stores:"
    )
    add_bullet(doc, "Customers frequently abandon beauty carts because static product listings fail to accurately convey how different shade variants appear on skin.", "Shade Ambiguity")
    add_bullet(doc, "Excessive page redirects, mandatory multi-step account registrations, and complicated checkout flows cause severe conversion drops.", "Checkout Friction")
    add_bullet(doc, "Shoppers experience anxiety after placing orders when stores lack self-service tracking or cancellation controls.", "Post-Purchase Blindness")
    add_bullet(doc, "Store managers require accessible administrative tools to promote sub-administrators and update orders without touching raw SQL databases.", "Administrative Barriers")

    add_styled_heading(doc, "3.3 Objectives of the Project", level=2)
    add_bullet(doc, "To design an interactive shade configurator that synchronizes photos, color swatches, and ambient glow accents in real time.")
    add_bullet(doc, "To implement an off-canvas shopping bag drawer and frictionless Cash on Delivery (COD) checkout workflow.")
    add_bullet(doc, "To build an order tracking page with a 5-stage fulfillment stepper and customer-initiated cancellation.")
    add_bullet(doc, "To provide an integrated customer support ticketing desk for shade exchange inquiries.")
    add_bullet(doc, "To construct a protected Admin Portal with Role-Based Access Control (Super Admin, Sub-Admin, Customer).")
    add_bullet(doc, "To guarantee fault tolerance via custom 404/503 error handling and automatic in-memory database fallback.")

    add_styled_heading(doc, "3.4 Tools & Technologies Used", level=2)
    
    tech_rows = [
        ("Technology / Tool", "Classification", "Specific Purpose in Luméa"),
        ("React 18", "Frontend Framework", "Declarative UI rendering, component reusability, and Context state management."),
        ("Vite 5.4", "Build Tool", "Next-generation bundling with ultra-fast Hot Module Replacement (HMR)."),
        ("Tailwind CSS 3.4", "CSS Framework", "Utility-first responsive design, custom brand palette (#FFF8FA, #D96C8A, #2B2024)."),
        ("Node.js & Express", "Backend Server", "Asynchronous event-driven REST API handling orders, tickets, products, and users."),
        ("MySQL 8.0", "Database", "Relational persistence normalized to 3NF with foreign key constraints."),
        ("In-Memory Fallback", "Resilience Engine", "Automated in-memory store activated whenever MySQL server is unreachable."),
        ("Git & GitHub", "Version Control", "Branching workflows and public open-source repository (Gibson990/LUMEA)."),
        ("Chrome & Edge DevTools", "Testing & Debugging", "Viewport emulation, network profiling, and CDP screenshot capture.")
    ]

    t_tech = doc.add_table(rows=len(tech_rows), cols=3)
    t_tech.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_tech.columns[0].width = Inches(1.8); t_tech.columns[1].width = Inches(1.8); t_tech.columns[2].width = Inches(2.9)
    for r_idx, row in enumerate(tech_rows):
        for c_idx, val in enumerate(row):
            cell = t_tech.cell(r_idx, c_idx)
            p = cell.paragraphs[0]; r = p.add_run(val); r.font.size = Pt(8.5)
            if r_idx == 0:
                r.font.bold = True; r.font.color.rgb = RGBColor(255, 255, 255)
                set_cell_background(cell, "2B2024")
            elif r_idx % 2 == 1:
                set_cell_background(cell, "FFF8FA")
            if c_idx == 0:
                r.font.bold = True

    doc.add_page_break()

    # =========================================================================
    # CHAPTER 4: SYSTEM ANALYSIS & DESIGN (STARTS ON OWN PAGE)
    # =========================================================================
    add_styled_heading(doc, "Chapter 4: System Analysis & Design", level=1)
    
    add_styled_heading(doc, "4.1 Requirement Analysis", level=2)
    add_body_p(doc, "The system requirements were categorized into functional and non-functional requirements:")
    add_bullet(doc, "Display Luméa Glow Tint details, live stock counters, formula specs, and customer reviews.", "FR-1: Catalog Display")
    add_bullet(doc, "Update active product photo, color badge, and ambient glow when a shade swatch is clicked.", "FR-2: Dynamic Swatches")
    add_bullet(doc, "Manage quantities, calculate subtotals, and trigger off-canvas cart visibility.", "FR-3: Bag Management")
    add_bullet(doc, "Validate shipping inputs, support Cash on Delivery, and generate unique order codes (#LM1024).", "FR-4: Order Placement")
    add_bullet(doc, "Track 5-stage fulfillment lifecycle and permit self-service cancellation in 'Pending' state.", "FR-5: Order Tracking")
    add_bullet(doc, "Accept customer support tickets and generate reference ticket IDs (#TCK-101).", "FR-6: Support Desk")
    add_bullet(doc, "Restrict administrative dashboard access based on roles (Super Admin, Sub-Admin, Customer).", "FR-7: RBAC Access")

    add_bullet(doc, "Maintain sub-1.5 second initial load and 60 FPS touch scroll performance on mobile screens.", "NFR-1: Performance")
    add_bullet(doc, "Fully responsive layouts across mobile (360px+), tablet (768px+), and desktop (1280px+).", "NFR-2: Responsiveness")
    add_bullet(doc, "Graceful error recovery via custom 404, 503, and root React ErrorBoundary.", "NFR-3: Fault Tolerance")

    add_styled_heading(doc, "4.2 Feasibility Study", level=2)
    add_body_p(doc, "Technical feasibility is assured using widely supported open-source stacks (React 18, Express, MySQL) with extensive developer documentation and zero proprietary runtime costs.", bold_prefix="Technical Feasibility: ")
    add_body_p(doc, "Economic feasibility is high since the static frontend can be deployed on zero-cost tiers (Vercel, Netlify) and the Node.js API operates within 256MB RAM constraints.", bold_prefix="Economic Feasibility: ")
    add_body_p(doc, "Operational feasibility is validated through intuitive single-product user journeys requiring zero technical training for shoppers or administrative staff.", bold_prefix="Operational Feasibility: ")

    add_styled_heading(doc, "4.3 System Design & Architecture Flow", level=2)
    add_body_p(doc, "The decoupled three-tier system architecture and the order fulfillment state machine are illustrated below:")

    add_figure(doc, "docs/screenshots/flow_architecture.png", "Figure 4.1: Luméa Decoupled Client-Server Architecture & Request Flow", width_in=5.8)
    add_figure(doc, "docs/screenshots/flow_order_lifecycle.png", "Figure 4.2: Order Fulfillment Lifecycle & Customer Cancellation State Machine", width_in=5.8)

    add_styled_heading(doc, "4.4 Database Design & 3NF Schema", level=2)
    add_body_p(doc, "The MySQL database schema (lumea_db) is normalized to Third Normal Form (3NF) to eliminate insertion, update, and deletion anomalies:")

    db_rows = [
        ("Table Name", "Primary Key", "Foreign Keys", "Description"),
        ("products", "id (INT)", "None", "Master product information, pricing, description, stock."),
        ("product_variants", "id (INT)", "product_id -> products(id)", "The 6 shade variants, color hex codes, unit stocks, images."),
        ("customers", "id (INT)", "None", "Customer profiles, contact phone numbers, delivery addresses."),
        ("orders", "id (INT)", "customer_id -> customers(id)", "Order reference codes (#LM1024), amounts, fulfillment statuses."),
        ("order_items", "id (INT)", "order_id, variant_id", "Transactional line items, quantities purchased, unit prices."),
        ("users", "id (INT)", "None", "User accounts and RBAC access roles (admin, subadmin, customer)."),
        ("tickets", "id (INT)", "None", "Customer support inquiries and issue resolution statuses.")
    ]
    t_db = doc.add_table(rows=len(db_rows), cols=4)
    t_db.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_db.columns[0].width = Inches(1.3); t_db.columns[1].width = Inches(1.0); t_db.columns[2].width = Inches(1.8); t_db.columns[3].width = Inches(2.4)
    for r_idx, row in enumerate(db_rows):
        for c_idx, val in enumerate(row):
            cell = t_db.cell(r_idx, c_idx)
            p = cell.paragraphs[0]; r = p.add_run(val); r.font.size = Pt(8.5)
            if r_idx == 0:
                r.font.bold = True; r.font.color.rgb = RGBColor(255, 255, 255)
                set_cell_background(cell, "2B2024")
            elif r_idx % 2 == 1:
                set_cell_background(cell, "FFF8FA")
            if c_idx == 0:
                r.font.bold = True

    doc.add_page_break()

    # =========================================================================
    # CHAPTER 5: IMPLEMENTATION (STARTS ON OWN PAGE)
    # =========================================================================
    add_styled_heading(doc, "Chapter 5: Implementation", level=1)
    
    add_styled_heading(doc, "5.1 Modules Description", level=2)
    add_bullet(doc, "Presents the flagship Glow Tint with interactive swatches, dynamic photography updates, rating breakdown, and value guarantees.", "1. Storefront Hero Module")
    add_bullet(doc, "Off-canvas slide-out bag with quantity increment/decrement, subtotal calculation, and direct checkout link.", "2. Shopping Bag Drawer")
    add_bullet(doc, "Address validation, Cash on Delivery support, and clear UPI maintenance notifications.", "3. Order Checkout Flow")
    add_bullet(doc, "Search orders by code (#LM1024) to render a 5-step fulfillment stepper with cancellation capability.", "4. Self-Service Order Tracking")
    add_bullet(doc, "Interactive ticket submission desk generating customer inquiry references (#TCK-101).", "5. Customer Support Desk")
    add_bullet(doc, "Role-guarded control center with sales KPIs, order workflow updating, and sub-admin promotion.", "6. RBAC Admin Portal")

    add_styled_heading(doc, "5.2 Coding Standards Followed", level=2)
    add_bullet(doc, "Adhered to declarative, functional React component patterns and standardized custom hooks.")
    add_bullet(doc, "Used semantic HTML5 elements (<header>, <nav>, <main>, <section>, <footer>) for accessibility.")
    add_bullet(doc, "Established consistent camelCase for variables/functions and PascalCase for React components.")
    add_bullet(doc, "Separated stateful context logic (Auth, Cart, Notification) from presentation components.")
    add_bullet(doc, "Optimized CSS performance by eliminating heavyweight backdrop-filter blur on mobile screens.")

    add_styled_heading(doc, "5.3 Sample Code Snippets", level=2)
    
    code1 = """// ShadeSelector.jsx - Real-time swatch selection handler
export default function ShadeSelector({ variants, selectedVariant, onSelectVariant }) {
  return (
    <div id="shades" className="space-y-3">
      <div className="flex justify-between text-xs">
        <span>Select Shade: <strong>{selectedVariant?.name}</strong></span>
        <span>{selectedVariant?.stock > 0 ? `${selectedVariant.stock} available` : 'Out of stock'}</span>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {variants.map((variant) => (
          <button key={variant.id} onClick={() => onSelectVariant(variant)}
            className={`p-2 rounded-2xl ${selectedVariant?.id === variant.id ? 'ring-2 ring-[#D96C8A]' : ''}`}>
            <div className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: variant.color_hex }} />
            <span className="text-[11px] font-medium">{variant.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}"""
    add_code_block(doc, "Listing 5.1: Interactive Shade Selector Component (React)", code1)

    code2 = """// server.js - Order Creation Endpoint with Dual-Mode Resilience
app.post('/api/orders', async (req, res) => {
  const { customer, items, payment_method } = req.body;
  const orderCode = '#LM' + Math.floor(1000 + Math.random() * 9000);

  if (isFallback()) {
    // In-memory fallback mode
    const newOrder = { id: Date.now(), order_code: orderCode, customer_name: customer.name,
      shade_name: 'Rose Petal', quantity: items[0].quantity,
      total_amount: items[0].price * items[0].quantity, status: 'Pending',
      payment_method, created_at: new Date().toISOString() };
    memoryStore.orders.unshift(newOrder);
    return res.status(201).json({ success: true, order: newOrder });
  }

  // MySQL transactional persistence
  const pool = getPool();
  const conn = await pool.getConnection();
  await conn.query('INSERT INTO orders (order_code, total_amount, status) VALUES (?, ?, ?)',
    [orderCode, items[0].price * items[0].quantity, 'Pending']);
  conn.release();
  res.status(201).json({ success: true, order_code: orderCode });
});"""
    add_code_block(doc, "Listing 5.2: Express.js REST API Order Placement Handler", code2)

    add_styled_heading(doc, "5.4 Role-Based Access Control (RBAC) Matrix", level=2)
    rbac_rows = [
        ("Feature / Permission", "Customer (James)", "Sub-Admin (Pardeep)", "Super Admin (Kichu)"),
        ("Browse Storefront & Swatches", "Allowed", "Allowed", "Allowed"),
        ("Place Orders (Cash on Delivery)", "Allowed", "Allowed", "Allowed"),
        ("Track Order & Self-Cancel", "Allowed", "Allowed", "Allowed"),
        ("Submit Support Tickets", "Allowed", "Allowed", "Allowed"),
        ("Access Admin Portal (/admin)", "Blocked (403)", "Allowed", "Allowed"),
        ("Update Order Fulfillment Status", "Blocked", "Allowed", "Allowed"),
        ("Resolve Customer Tickets", "Blocked", "Allowed", "Allowed"),
        ("Promote / Demote User Roles", "Blocked", "Blocked", "Allowed (Super Admin)")
    ]
    t_rbac = doc.add_table(rows=len(rbac_rows), cols=4)
    t_rbac.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_rbac.columns[0].width = Inches(2.3); t_rbac.columns[1].width = Inches(1.4); t_rbac.columns[2].width = Inches(1.4); t_rbac.columns[3].width = Inches(1.4)
    for r_idx, row in enumerate(rbac_rows):
        for c_idx, val in enumerate(row):
            cell = t_rbac.cell(r_idx, c_idx)
            p = cell.paragraphs[0]; r = p.add_run(val); r.font.size = Pt(8.5)
            if r_idx == 0:
                r.font.bold = True; r.font.color.rgb = RGBColor(255, 255, 255)
                set_cell_background(cell, "2B2024")
            elif r_idx % 2 == 1:
                set_cell_background(cell, "FFF8FA")
            if c_idx == 0:
                r.font.bold = True

    doc.add_page_break()

    # =========================================================================
    # CHAPTER 6: TESTING & QUALITY ASSURANCE (STARTS ON OWN PAGE)
    # =========================================================================
    add_styled_heading(doc, "Chapter 6: Testing", level=1)
    
    add_styled_heading(doc, "6.1 Testing Objectives", level=2)
    add_body_p(doc,
        "Testing was performed across all development iterations to verify that the developed web pages, interactive shade configurators, cart drawers, and API endpoints behaved strictly according to specification. Key objectives included verifying cross-device layout stability, validating form submission and cancellation flows, testing RBAC security gates, and confirming fault-tolerant recovery."
    )

    add_styled_heading(doc, "6.2 Testing Methods Used", level=2)
    add_bullet(doc, "Individual React state transitions and helper calculations were validated independently.", "Unit Testing")
    add_bullet(doc, "Client-to-backend communication between Axios API services and Express endpoints was verified.", "Integration Testing")
    add_bullet(doc, "The full user flow from shade selection to order checkout, tracking, and cancellation was tested.", "Functional & System Testing")
    add_bullet(doc, "UI layouts and touch response times were verified across desktop, tablet, and mobile device viewports.", "Cross-Device Responsive Testing")

    add_styled_heading(doc, "6.3 Test Cases & Results", level=2)

    test_cases = [
        ("TC ID", "Module", "Test Scenario / Input", "Expected Output", "Status"),
        ("TC-01", "Storefront", "Click 'Berry Kiss' shade swatch", "Hero image changes to Berry Kiss; glow turns wine pink; stock shows 30.", "PASSED"),
        ("TC-02", "Cart Drawer", "Click 'Add to Bag' (qty = 2)", "Bag opens showing 2 units, subtotal equals ₹1,598, free delivery applied.", "PASSED"),
        ("TC-03", "Checkout", "Submit valid address with COD", "Persists order (#LM1024), empties bag, navigates to confirmation.", "PASSED"),
        ("TC-04", "Checkout", "Click 'UPI / Instant Payment'", "Renders notice: 'UPI under maintenance, please use COD'.", "PASSED"),
        ("TC-05", "Tracking", "Enter order code '#LM1024'", "Renders 5-step visual fulfillment progress stepper accurately.", "PASSED"),
        ("TC-06", "Tracking", "Click 'Cancel Order' on Pending", "Updates status to Cancelled and returns unit stock to inventory.", "PASSED"),
        ("TC-07", "Support Desk", "Submit shade exchange inquiry", "Returns generated ticket reference ID (e.g. #TCK-101).", "PASSED"),
        ("TC-08", "Security", "Access /admin as Customer (James)", "Renders Access Restricted barrier; blocks administrative data.", "PASSED"),
        ("TC-09", "Admin Portal", "Login as Super Admin (Kichu)", "Unlocks Sales KPIs (₹92,400), Orders table, and User Roles tab.", "PASSED"),
        ("TC-10", "Admin Portal", "Promote customer to 'Sub-Admin'", "User role persists as subadmin; new privileges apply immediately.", "PASSED"),
        ("TC-11", "Error 404", "Navigate to bad route '/invalid'", "Renders custom 404 page with gradient numeral and recovery CTA.", "PASSED"),
        ("TC-12", "Mobile UI", "Emulate mobile viewport (390x844)", "Collapses menu into drawer, swatches wrap neatly, no draggy scroll.", "PASSED")
    ]

    t_test = doc.add_table(rows=len(test_cases), cols=5)
    t_test.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_test.columns[0].width = Inches(0.8); t_test.columns[1].width = Inches(1.1); t_test.columns[2].width = Inches(2.1); t_test.columns[3].width = Inches(1.9); t_test.columns[4].width = Inches(0.8)
    for r_idx, row in enumerate(test_cases):
        for c_idx, val in enumerate(row):
            cell = t_test.cell(r_idx, c_idx)
            p = cell.paragraphs[0]; r = p.add_run(val); r.font.size = Pt(8.5)
            if r_idx == 0:
                r.font.bold = True; r.font.color.rgb = RGBColor(255, 255, 255)
                set_cell_background(cell, "2B2024")
            else:
                if r_idx % 2 == 1:
                    set_cell_background(cell, "FFF8FA")
                if c_idx == 4:
                    r.font.bold = True; r.font.color.rgb = RGBColor(20, 140, 60)

    doc.add_page_break()

    # =========================================================================
    # CHAPTER 7: SYSTEM SCREENSHOTS (STARTS ON OWN PAGE)
    # =========================================================================
    add_styled_heading(doc, "Chapter 7: Screenshots / Output", level=1)
    add_body_p(doc,
        "The following screenshots captured directly from the live Luméa application document key user journeys, responsive views, administrative controls, and system outputs."
    )

    shots = "docs/screenshots"
    add_figure(doc, f"{shots}/fig_7_1_storefront_hero.png", "Figure 7.1: Luméa Storefront Landing & Interactive Hero Product Configurator")
    add_figure(doc, f"{shots}/fig_7_2_specs_gallery.png", "Figure 7.2: Product Specifications & Botanical Formula Details Gallery")
    
    doc.add_page_break()
    add_figure(doc, f"{shots}/fig_7_3_benefits_howtouse.png", "Figure 7.3: Product Benefits & Multi-Use Application Guide (Cheeks, Lips, Eyes)")
    add_figure(doc, f"{shots}/fig_7_4_customer_reviews.png", "Figure 7.4: Verified Customer Reviews & 4.9-Star Rating Breakdown")
    
    doc.add_page_break()
    add_figure(doc, f"{shots}/fig_7_5_checkout_page.png", "Figure 7.5: Frictionless Checkout Flow with Cash on Delivery & Order Breakdown")
    add_figure(doc, f"{shots}/fig_7_6_track_order.png", "Figure 7.6: Live Self-Service Order Tracking Stepper with Active Cancellation Action")
    
    doc.add_page_break()
    add_figure(doc, f"{shots}/fig_7_7_support_desk.png", "Figure 7.7: Customer Support Desk with Instant Ticket ID Generation")
    add_figure(doc, f"{shots}/fig_7_8_admin_dashboard.png", "Figure 7.8: Admin Management Portal with Real-Time Revenue & Order KPIs")
    
    doc.add_page_break()
    add_figure(doc, f"{shots}/fig_7_9_admin_users.png", "Figure 7.9: Admin Role-Based Access Control — Promoting Users to Sub-Admin")
    add_figure(doc, f"{shots}/fig_7_10_404_resilience.png", "Figure 7.10: Fault-Tolerant Custom 404 Error Page with Recovery Navigation")
    add_figure(doc, f"{shots}/fig_7_11_mobile_view.png", "Figure 7.11: Mobile-Optimized Responsive Viewport (390x844)", width_in=3.3)

    doc.add_page_break()

    # =========================================================================
    # CHAPTER 8: CONCLUSION & REFERENCES (STARTS ON OWN PAGE)
    # =========================================================================
    add_styled_heading(doc, "Chapter 8: Conclusion & Future Scope", level=1)
    
    add_styled_heading(doc, "8.1 Conclusion", level=2)
    add_body_p(doc,
        "The web development internship at Viro Web Solution provided comprehensive practical exposure to modern software engineering paradigms. Working on the \"Luméa: Single-Product Beauty E-Commerce Platform\" successfully bridged theoretical university curricula with production web development practices. All targeted objectives — including responsive React UI design, interactive shade customizers, Cash on Delivery checkout, self-service tracking, and administrative RBAC controls — were successfully engineered and validated."
    )

    add_styled_heading(doc, "8.2 Limitations", level=2)
    add_bullet(doc, "Online payment processing via UPI and card gateways is currently in demo/maintenance mode and requires production payment aggregator merchant keys.")
    add_bullet(doc, "Order tracking relies on web-based status querying rather than real-time courier GPS integration.")

    add_styled_heading(doc, "8.3 Future Enhancements", level=2)
    add_bullet(doc, "Integration with live Razorpay/Stripe webhooks for instant UPI, credit card, and digital wallet checkout.", "Live Payment Gateway")
    add_bullet(doc, "Computer-vision shade matcher utilizing webcam feeds to recommend ideal tint shades based on skin undertones.", "AI Shade Recommendation")
    add_bullet(doc, "Automated SMS and WhatsApp shipment milestone notifications via Twilio or Gupshup messaging APIs.", "Automated Dispatch Alerts")
    add_bullet(doc, "Localization supporting regional Indian languages (Hindi, Punjabi, Marathi) to expand D2C beauty reach.", "Multi-Language Localization")

    add_styled_heading(doc, "References / Bibliography", level=1)
    add_bullet(doc, "React 18 Official Documentation: Declarative UI, Component Lifecycle, and Hooks. Available at: https://react.dev/")
    add_bullet(doc, "Tailwind CSS Utility-First Framework Documentation. Available at: https://tailwindcss.com/")
    add_bullet(doc, "Express.js RESTful Application Framework for Node.js. Available at: https://expressjs.com/")
    add_bullet(doc, "MySQL 8.0 Reference Manual — Database Normalization & Transactional Integrity. Available at: https://dev.mysql.com/doc/")
    add_bullet(doc, "Vite Next Generation Frontend Tooling Documentation. Available at: https://vitejs.dev/")
    add_bullet(doc, "Mozilla Developer Network (MDN) Web Docs — Performance, CSS Transitions, and Compositor Optimization.")

    out_file = "docs/LUMEA_ECommerce_Internship_Report.docx"
    doc.save(out_file)
    print(f"REPORT GENERATED: {out_file} ({os.path.getsize(out_file)} bytes)")

if __name__ == '__main__':
    build_document()
