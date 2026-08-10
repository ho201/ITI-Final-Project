const captalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


const slugify = (str) => {//بتحول النص إلى Slug مناسب للـ URL.
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")//دي بتشيل الرموز الخاصة.
    .replace(/[\s_-]+/g, "-");//دي بتحول المسافات أو _ أو - المتكررة إلى -.

};

const truncate = (str, maxLength) => {//بتقص النص لو طويل.
  //الفكرة إنها مفيدة لما يكون عندك Description طويل وعايزة تعرضي جزء منه بس
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
};