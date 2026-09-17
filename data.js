/*
  ============================================================
  ADDING WORKS IS EASY:
  1) Put the image inside: assets/works/
  2) Copy one object below and change its information.
  3) Save this file and commit the change on GitHub.

  Example:
  {
    id: 4,
    category: "Art",
    title: {en:"My New Drawing", ar:"رسمتي الجديدة"},
    description: {en:"Short description", ar:"وصف قصير"},
    image: "assets/works/my-new-drawing.jpg"
  }

  Categories can be: Art, Design, Video, Game Dev
  If you don't have an image yet, use image: "".
  ============================================================
*/

const works = [
  {
    id: 1,
    category: "Art",
    title: {en:"Your First Artwork", ar:"أول عمل فني"},
    description: {en:"Replace this with your real work.", ar:"استبدل هذا بالعمل الحقيقي."},
    image: ""
  },
  {
    id: 2,
    category: "Design",
    title: {en:"Brand Identity", ar:"هوية بصرية"},
    description: {en:"Branding and visual design project.", ar:"مشروع تصميم وهوية بصرية."},
    image: ""
  },
  {
    id: 3,
    category: "Video",
    title: {en:"Before / After", ar:"قبل / بعد"},
    description: {en:"Editing and visual improvement project.", ar:"مشروع مونتاج وتحسين بصري."},
    image: ""
  }
];

const services = [
  {title:{en:"Digital Art & Illustration",ar:"الرسم والفن الرقمي"},price:{en:"Custom pricing",ar:"السعر حسب العمل"}},
  {title:{en:"Branding & Brand Kits",ar:"الهوية البصرية"},price:{en:"Custom pricing",ar:"السعر حسب المطلوب"}},
  {title:{en:"Thumbnails & Social Design",ar:"الثمبنيل وتصاميم السوشيال"},price:{en:"Custom pricing",ar:"السعر حسب التصميم"}},
  {title:{en:"Video Editing",ar:"مونتاج الفيديو"},price:{en:"Custom pricing",ar:"السعر حسب الفيديو"}},
  {title:{en:"Game Art & Assets",ar:"رسومات وأصول الألعاب"},price:{en:"Custom pricing",ar:"السعر حسب المشروع"}},
  {title:{en:"Godot Projects",ar:"مشاريع Godot"},price:{en:"Custom pricing",ar:"السعر حسب المشروع"}}
];

const siteConfig = {
  whatsapp: "YOUR_WHATSAPP_NUMBER"
};
