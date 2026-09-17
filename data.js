/*
  ============================================================
  ADD A NEW WORK — only 2 simple steps:
  1. Put the image in: assets/works/
  2. Copy one item below and change title/category/description/image.

  Example:
  {
    category: "Art",
    title: {en:"My New Drawing", ar:"رسمتي الجديدة"},
    description: {en:"Short description", ar:"وصف قصير"},
    image: "assets/works/my-new-drawing.jpg"
  }

  Categories: Art, Design, Video, Game Dev
  Keep image empty ("") if you don't have one yet.
  ============================================================
*/
const works = [
  {category:"Art",title:{en:"Your Artwork",ar:"عملك الفني"},description:{en:"Replace this with your real work.",ar:"استبدل هذا بالعمل الحقيقي."},image:""},
  {category:"Design",title:{en:"Brand Identity",ar:"هوية بصرية"},description:{en:"Branding and visual design.",ar:"مشروع هوية وتصميم بصري."},image:""},
  {category:"Video",title:{en:"Before / After",ar:"قبل / بعد"},description:{en:"Editing and visual improvement.",ar:"مشروع مونتاج وتحسين بصري."},image:""},
  {category:"Game Dev",title:{en:"Game Asset",ar:"أصل من لعبة"},description:{en:"A game-related creation.",ar:"عمل متعلق بتطوير الألعاب."},image:""}
];

const services = [
  {title:{en:"Digital Art & Illustration",ar:"الرسم والفن الرقمي"},price:{en:"Custom",ar:"حسب العمل"}},
  {title:{en:"Branding & Brand Kits",ar:"الهوية البصرية"},price:{en:"Custom",ar:"حسب المطلوب"}},
  {title:{en:"Thumbnails & Social Design",ar:"الثمبنيل وتصاميم السوشيال"},price:{en:"Custom",ar:"حسب التصميم"}},
  {title:{en:"Video Editing",ar:"مونتاج الفيديو"},price:{en:"Custom",ar:"حسب الفيديو"}},
  {title:{en:"Game Art & Assets",ar:"رسومات وأصول الألعاب"},price:{en:"Custom",ar:"حسب المشروع"}},
  {title:{en:"Godot Projects",ar:"مشاريع Godot"},price:{en:"Custom",ar:"حسب المشروع"}}
];

const siteConfig = { whatsapp:"YOUR_WHATSAPP_NUMBER" };
