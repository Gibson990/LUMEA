# UI/UX DESIGN SPECIFICATION & BRAND SYSTEM

## Project: Luméa Beauty E-Commerce Platform

---

## 1. BRAND IDENTITY & POSITIONING

**Luméa** is a premium yet approachable beauty brand centered on minimalist everyday makeup. 
* **Tagline**: *"Glow, your way."*
* **Core Product**: Luméa Glow Tint (Cream Blush / Lip Tint, 8g net wt.)
* **Personality**: Feminine, soft, luxurious, clean, effortless.

---

## 2. COLOR SYSTEM & DESIGN TOKENS

```css
:root {
  /* Brand Primary Colors */
  --color-bg: #FFF8FA;          /* Soft Cream Pink Background */
  --color-primary: #D96C8A;     /* Soft Rose Pink */
  --color-primary-hover: #c45775;
  --color-text-main: #2B2024;   /* Deep Espresso Brown */
  --color-text-muted: #6e5f65;  /* Warm Muted Gray-Brown */

  /* Surface & Secondary Palette */
  --color-surface: #FFFFFF;     /* Pure White Card Surface */
  --color-soft-pink: #F4D8DF;   /* Light Accent Tint */
  --color-dusty-rose: #C78A98;  /* Subtle Borders & Dividers */
  
  /* Status Colors */
  --color-status-pending: #eab308;
  --color-status-confirmed: #3b82f6;
  --color-status-processing: #8b5cf6;
  --color-status-shipped: #06b6d4;
  --color-status-delivered: #22c55e;
  --color-status-cancelled: #ef4444;
}
```

---

## 3. TYPOGRAPHY HIERARCHY

| Scale / Element | Font Family | Size | Weight | Line Height |
|---|---|---|---|---|
| Display / Hero | `Playfair Display` | 3.5rem (56px) | 700 (Bold) | 1.1 |
| Heading 1 (H1) | `Playfair Display` | 2.5rem (40px) | 600 (SemiBold) | 1.2 |
| Heading 2 (H2) | `Playfair Display` | 2.0rem (32px) | 600 (SemiBold) | 1.3 |
| Heading 3 (H3) | `Inter` / `Outfit` | 1.25rem (20px) | 600 (SemiBold) | 1.4 |
| Body Text | `Inter` / `Outfit` | 1.0rem (16px) | 400 (Regular) | 1.6 |
| Small / Badges | `Inter` / `Outfit` | 0.875rem (14px) | 500 (Medium) | 1.4 |

---

## 4. SHADE COLOR SWATCHES

| Shade Variant Name | Description | Color Hex |
|---|---|---|
| **Rose Petal** | Soft romantic pink | `#D9828B` |
| **Peach Bloom** | Warm peach tint | `#EFA07F` |
| **Berry Kiss** | Rich berry flush | `#A94B68` |
| **Soft Coral** | Fresh coral glow | `#E87970` |
| **Nude Glow** | Warm sun-kissed nude | `#B97862` |
| **Pink Champagne** | Soft shimmering pink | `#E8A5B5` |

---

## 5. UI COMPONENT LAYOUT WIREFRAMES

### 5.1 Hero & Shade Picker Wireframe Layout
```text
+-----------------------------------------------------------------------+
|  LUMÉA                       Shop   About   Shades   Reviews   Bag(1) |
+-----------------------------------------------------------------------+
|                                                                       |
|   Glow, your way.                    +----------------------------+   |
|                                      |                            |   |
|   Luméa Glow Tint                    |     [ PRODUCT IMAGE ]      |   |
|   A silky cream tint that melts      |   Luméa Glow Tint Packaging |   |
|   into your skin for a natural       |                            |   |
|   buildable flush.                   +----------------------------+   |
|                                                                       |
|   ₹799.00                            Select Shade:                    |
|                                      (O) Rose Petal  (O) Peach Bloom  |
|   [ - ]  1  [ + ]                     (O) Berry Kiss  (O) Soft Coral   |
|                                      (O) Nude Glow   (O) Pink Champ...|
|   [ ADD TO BAG  ♡ ]                                                   |
+-----------------------------------------------------------------------+
```
