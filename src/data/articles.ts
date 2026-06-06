export type Category = "Berita Kesehatan" | "Aksi Kemanusiaan" | "Edukasi" | "Gizi" | "Kemanusiaan";

export interface Author {
  name: string;
  title: string;
  avatar?: string;
}

export interface BodyImage {
  afterParagraph: number; // sisipkan setelah paragraf ke-N (0-indexed)
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];        // array paragraf
  pullQuote?: string;
  category: Category;
  tags: string[];
  author: Author;
  publishedAt: string;   // ISO string
  readingMinutes: number;
  hasAudio: boolean;
  isVerified: boolean;
  heroImage: string;
  heroCaption?: string;  // keterangan foto hero
  heroCredit?: string;   // sumber foto hero — ditampilkan sebagai "(Foto: X)"
  thumbnailImage: string;
  featured?: boolean;
  bodyImages?: BodyImage[]; // gambar inline di badan artikel
}

export const articles: Article[] = [
  {
    slug: "wabah-dbd-sumenep-musim-hujan",
    title: "Waspada DBD di Musim Hujan: Dua Kecamatan di Sumenep Masuk Status Waspada",
    excerpt:
      "Dinas Kesehatan Sumenep mencatat lonjakan kasus demam berdarah dengue (DBD) di Kecamatan Kalianget dan Saronggi memasuki musim hujan. Masyarakat diimbau aktif melaksanakan 3M Plus.",
    body: [
      "Memasuki musim hujan, Dinas Kesehatan Kabupaten Sumenep mengeluarkan surat edaran kewaspadaan demam berdarah dengue (DBD) untuk dua kecamatan: Kalianget dan Saronggi. Dalam sepekan terakhir, tercatat 14 kasus baru dengan satu pasien anak berusia 7 tahun yang harus dirawat intensif di RSUD dr. H. Moh. Anwar Sumenep.",
      "Kepala Bidang Pencegahan dan Pengendalian Penyakit Dinkes Sumenep, dr. Halimah, menegaskan bahwa lonjakan ini dipicu oleh genangan air di area permukiman padat setelah hujan deras yang melanda selama tiga hari berturut-turut. \"Tempat perindukan nyamuk Aedes aegypti ada di mana-mana — ban bekas, kaleng kosong, bahkan pot bunga yang tidak terurus,\" ujarnya saat ditemui tim Bulan Sabit Sumenep.",
      "Gerakan Pemberantasan Sarang Nyamuk (PSN) 3M Plus kini digencarkan bersama kader Jumantik (Juru Pemantau Jentik) di 47 desa yang masuk zona kuning. PMI Sumenep turut mengerahkan relawan untuk membantu edukasi warga di daerah kepulauan yang sulit dijangkau tenaga kesehatan, termasuk Kepulauan Kangean dan Sapudi.",
      "Gejala DBD yang perlu diwaspadai antara lain demam tinggi mendadak (38–40°C) selama 2–7 hari, nyeri di belakang mata, nyeri otot dan sendi, serta munculnya bintik-bintik merah di kulit. \"Jangan tunggu sampai tiga hari, segera ke puskesmas terdekat jika anak demam tinggi,\" tegas dr. Halimah.",
      "PMI Sumenep juga membuka pos layanan kesehatan keliling di Pasar Anom Baru setiap Sabtu pagi untuk pemeriksaan darah gratis bagi warga yang menunjukkan gejala awal DBD. Layanan ini didukung oleh tim dokter sukarela dari IDI Sumenep.",
    ],
    pullQuote:
      "\"Jangan tunggu sampai tiga hari. Segera ke puskesmas terdekat jika anak demam tinggi.\" — dr. Halimah, Dinkes Sumenep",
    category: "Berita Kesehatan",
    tags: ["DBD", "Sumenep", "Musim Hujan", "Nyamuk", "Kewaspadaan"],
    author: { name: "dr. Anwar Fauzi", title: "Dokter Umum, Kontributor BSS" },
    publishedAt: "2026-06-05T08:00:00+07:00",
    readingMinutes: 4,
    hasAudio: true,
    isVerified: true,
    heroImage: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1200&q=80",
    heroCaption: "Ilustrasi nyamuk Aedes aegypti, vektor utama penularan demam berdarah dengue (DBD).",
    heroCredit: "Freepik",
    thumbnailImage: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&q=80",
    featured: true,
    bodyImages: [
      {
        afterParagraph: 1,
        src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
        alt: "Petugas Dinas Kesehatan Sumenep melakukan fogging di permukiman warga Kalianget",
        caption: "Petugas Dinkes Sumenep melakukan fogging di permukiman padat Kecamatan Kalianget untuk memutus rantai penularan DBD.",
        credit: "Dinkes Sumenep",
      },
    ],
  },
  {
    slug: "stunting-gizi-balita-kepulauan",
    title: "Angka Stunting di Kepulauan Sumenep Turun 3,2%: Apa yang Berhasil?",
    excerpt:
      "Intervensi gizi terpadu yang melibatkan kader Posyandu, PMI, dan pemerintah desa berhasil menekan angka stunting di tiga pulau terpencil Sumenep selama dua tahun terakhir.",
    body: [
      "Kabar menggembirakan datang dari Kepulauan Kangean, Sapudi, dan Ra'as — tiga gugus pulau terluar Kabupaten Sumenep yang selama bertahun-tahun mencatat angka stunting di atas rata-rata nasional. Data terbaru Dinkes Sumenep menunjukkan penurunan prevalensi stunting sebesar 3,2 poin persentase, dari 31,4% menjadi 28,2% dalam kurun dua tahun.",
      "Pencapaian ini bukan kebetulan. Sejak 2024, program \"Anak Pulau Sehat\" yang diprakarsai Dinas Kesehatan bersama PMI Sumenep dan Yayasan Bakti Nusantara menjalankan tiga intervensi sekaligus: pemberian makanan tambahan (PMT) berbahan lokal, pelatihan intensif kader Posyandu, dan kunjungan dokter gizi ke pulau-pulau yang selama ini hanya dikunjungi dokter sekali dalam tiga bulan.",
      "\"Yang membedakan program ini adalah penggunaan bahan pangan lokal — ikan tongkol, daun kelor, dan singkong — yang mudah didapat warga pulau,\" jelas dr. Siti Maryam, ahli gizi klinis yang memimpin tim intervensi. Resep-resep MPASI berbasis pangan lokal ini kini telah dicetak dalam buku saku dan dibagikan ke 1.200 rumah tangga dengan balita di zona merah stunting.",
      "PMI Sumenep menjadi jembatan distribusi di daerah terpencil. Armada kapal PMI yang selama ini digunakan untuk evakuasi korban bencana kini juga dimanfaatkan untuk mengangkut suplemen gizi dan membawa kader Posyandu mengikuti pelatihan di daratan.",
      "Perjuangan belum selesai. Angka 28,2% masih jauh di atas target nasional 14%. Kader Posyandu di Kepulauan Kangean, Ibu Romlah (52), bercerita tentang tantangan sehari-hari: \"Kadang orangtua tidak percaya anaknya stunting. Mereka bilang anak itu mirip bapaknya yang memang kecil. Tugas kami meyakinkan bahwa ini bisa dicegah dan diperbaiki.\"",
    ],
    pullQuote:
      "\"Yang membedakan program ini adalah penggunaan bahan pangan lokal yang mudah didapat warga pulau.\" — dr. Siti Maryam",
    category: "Berita Kesehatan",
    tags: ["Stunting", "Gizi Balita", "Kepulauan", "Posyandu", "PMI"],
    author: { name: "dr. Siti Rahmah", title: "Ahli Gizi, Kontributor BSS" },
    publishedAt: "2026-06-04T10:30:00+07:00",
    readingMinutes: 5,
    hasAudio: true,
    isVerified: true,
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    heroCaption: "Kader Posyandu menimbang balita di Kepulauan Kangean sebagai bagian dari pemantauan tumbuh kembang.",
    heroCredit: "PMI Sumenep",
    thumbnailImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
    bodyImages: [
      {
        afterParagraph: 2,
        src: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
        alt: "Kader Posyandu membagikan makanan tambahan berbahan pangan lokal kepada balita di Kangean",
        caption: "Kader Posyandu membagikan PMT berbahan pangan lokal — ikan tongkol dan daun kelor — kepada balita di Desa Arjasa, Kangean.",
        credit: "Program Anak Pulau Sehat",
      },
    ],
  },
  {
    slug: "bakti-kesehatan-pmi-kepulauan-kangean",
    title: "PMI Sumenep Gelar Bakti Kesehatan di Kangean: 400 Warga Dapat Layanan Gratis",
    excerpt:
      "Tim medis PMI Sumenep bersama relawan dari IDI dan IBI menjangkau tiga desa terpencil di Kepulauan Kangean, memberikan layanan pemeriksaan umum, KB, dan pengobatan gratis.",
    body: [
      "Selama tiga hari (2–4 Juni 2026), tim gabungan PMI Sumenep, Ikatan Dokter Indonesia (IDI) cabang Sumenep, dan Ikatan Bidan Indonesia (IBI) Sumenep menggelar bakti kesehatan di Kepulauan Kangean. Sebanyak 400 warga dari Desa Arjasa, Buddi, dan Paseraman mendapat layanan kesehatan gratis yang jarang mereka nikmati.",
      "Layanan yang diberikan meliputi pemeriksaan kesehatan umum, pemeriksaan gigi, konsultasi KB, imunisasi balita, dan pengobatan penyakit ringan. Warga yang membutuhkan penanganan lebih lanjut diberikan surat rujukan ke RSUD Sumenep dengan fasilitas transportasi yang dikoordinasikan PMI.",
      "Menurut Ketua PMI Sumenep, H. Moh. Saleh, bakti kesehatan ini merupakan bagian dari program rutin triwulanan yang menyasar daerah 3T (Tertinggal, Terdepan, Terluar) di Kabupaten Sumenep. \"Warga kepulauan berhak mendapat akses kesehatan yang sama. Jarak bukan halangan,\" tegasnya.",
      "Salah satu warga yang merasakan manfaatnya adalah Ibu Fatimah (67), warga Desa Arjasa yang sudah setahun tidak memeriksakan darah tingginya. \"Biasanya kalau mau ke dokter harus naik kapal, biayanya tidak sedikit. Adanya bakti kesehatan ini sangat membantu,\" ungkapnya.",
      "PMI Sumenep berencana memperluas jangkauan ke Kepulauan Ra'as dan Masalembu pada bakti kesehatan berikutnya yang dijadwalkan September 2026. Donasi untuk mendukung program ini dapat dilakukan melalui rekening resmi PMI Sumenep atau melalui tautan WhatsApp yang tersedia.",
    ],
    category: "Aksi Kemanusiaan",
    tags: ["Bakti Kesehatan", "Kangean", "PMI", "Layanan Gratis", "Kepulauan"],
    author: { name: "Redaksi BSS", title: "Tim Jurnalis Bulan Sabit Sumenep" },
    publishedAt: "2026-06-03T14:00:00+07:00",
    readingMinutes: 3,
    hasAudio: true,
    isVerified: false,
    heroImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80",
    heroCaption: "Tim medis PMI Sumenep memeriksa kesehatan warga di Kepulauan Kangean.",
    heroCredit: "PMI Sumenep",
    thumbnailImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
  },
  {
    slug: "mengenal-oralit-rumahan",
    title: "Cara Membuat Oralit Rumahan yang Benar untuk Atasi Diare pada Anak",
    excerpt:
      "Diare masih menjadi penyebab kematian anak tertinggi kedua di Madura. Pelajari cara membuat dan memberikan oralit rumahan yang tepat sebelum membawa anak ke puskesmas.",
    body: [
      "Diare akut adalah kondisi yang bisa berubah dari gangguan ringan menjadi darurat medis dalam hitungan jam pada anak di bawah lima tahun. Di wilayah kepulauan Sumenep, keterbatasan akses ke fasilitas kesehatan membuat penanganan awal di rumah menjadi sangat kritis.",
      "Oralit adalah pertolongan pertama yang paling efektif untuk mencegah dehidrasi akibat diare. Jika sachet oralit tidak tersedia, Anda bisa membuat larutan oralit rumahan dengan bahan yang hampir selalu ada di dapur: satu liter air matang, satu sendok teh garam, dan delapan sendok teh gula pasir.",
      "Cara pemberiannya: untuk bayi di bawah 2 tahun, berikan 50–100 mL setelah setiap kali buang air besar. Untuk anak 2–10 tahun, berikan 100–200 mL. Jangan dipaksakan sekali banyak — berikan sedikit-sedikit setiap 5–10 menit.",
      "Tanda-tanda anak harus segera dibawa ke fasilitas kesehatan: diare lebih dari 10 kali dalam sehari, ada darah dalam tinja, anak tampak sangat lemas atau tidak mau minum, mata cekung, atau kulit kering dan tidak elastis. \"Tanda dehidrasi berat pada anak adalah cubitan kulit yang tidak segera kembali. Ini kedaruratan,\" jelas dr. Anwar Fauzi.",
      "Penting juga diingat: antibiotik tidak diperlukan untuk diare biasa. Penggunaan antibiotik yang tidak tepat justru berbahaya dan dapat memperparah kondisi. Jika anak masih ASI, teruskan pemberian ASI lebih sering dari biasanya.",
    ],
    pullQuote:
      "\"Cubitan kulit yang tidak segera kembali adalah tanda dehidrasi berat pada anak. Ini kedaruratan medis.\" — dr. Anwar Fauzi",
    category: "Edukasi",
    tags: ["Diare", "Oralit", "Dehidrasi", "Anak", "Pertolongan Pertama"],
    author: { name: "dr. Anwar Fauzi", title: "Dokter Umum, Kontributor BSS" },
    publishedAt: "2026-06-02T09:00:00+07:00",
    readingMinutes: 4,
    hasAudio: true,
    isVerified: true,
    heroImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
  },
  {
    slug: "manfaat-kelor-gizi-ibu-hamil",
    title: "Daun Kelor: Superfood Lokal untuk Ibu Hamil dan Menyusui di Kepulauan",
    excerpt:
      "Kelor yang tumbuh liar di pekarangan menyimpan kandungan gizi luar biasa. Dokter gizi menjelaskan cara memanfaatkannya untuk mencegah anemia dan kekurangan gizi pada ibu hamil.",
    body: [
      "Pohon kelor (Moringa oleifera) tumbuh hampir di setiap pekarangan rumah di kepulauan Sumenep, namun potensi gizinya masih sangat kurang dimanfaatkan. Padahal, 100 gram daun kelor segar mengandung vitamin C 7 kali lebih banyak dari jeruk, kalsium 4 kali lebih banyak dari susu, dan zat besi 3 kali lebih banyak dari bayam.",
      "Bagi ibu hamil di kepulauan yang seringkali kesulitan mengakses suplemen gizi dari toko, kelor bisa menjadi alternatif yang sangat berharga. \"Saya selalu menyarankan ibu hamil di kepulauan untuk mengonsumsi daun kelor minimal tiga kali seminggu,\" ujar dr. Siti Maryam, ahli gizi klinis yang aktif bertugas di kepulauan Sumenep.",
      "Cara memasak kelor sangat mudah dan tidak mengubah kandungan gizinya secara signifikan: bisa dijadikan sayur bening, ditumis dengan bumbu sederhana, atau ditambahkan ke dalam telur dadar. Untuk ibu menyusui, daun kelor juga dikenal sebagai galaktagog alami yang dapat meningkatkan produksi ASI.",
      "Namun ada satu catatan penting: ibu hamil yang sedang mengonsumsi obat tiroid atau obat pengencer darah sebaiknya berkonsultasi dulu ke dokter sebelum mengonsumsi kelor dalam jumlah besar, karena kelor dapat berinteraksi dengan beberapa jenis obat.",
      "PMI Sumenep bersama Dinas Ketahanan Pangan kini tengah mengembangkan program \"Kebun Gizi Desa\" yang mendorong setiap rumah tangga dengan ibu hamil dan balita untuk menanam kelor di pekarangan. Program ini ditargetkan menjangkau 200 desa di daratan dan kepulauan Sumenep pada akhir 2026.",
    ],
    category: "Gizi",
    tags: ["Kelor", "Gizi", "Ibu Hamil", "ASI", "Pangan Lokal"],
    author: { name: "dr. Siti Maryam", title: "Ahli Gizi Klinis, Kontributor BSS" },
    publishedAt: "2026-06-01T08:30:00+07:00",
    readingMinutes: 4,
    hasAudio: true,
    isVerified: true,
    heroImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    slug: "donor-darah-pmi-sumenep",
    title: "Stok Darah PMI Sumenep Menipis: Golongan B dan O Paling Dibutuhkan",
    excerpt:
      "PMI Sumenep membutuhkan pendonor darah sukarela, terutama golongan B dan O. Proses donor hanya 15 menit dan dapat menyelamatkan hingga 3 nyawa sekaligus.",
    body: [
      "Unit Donor Darah (UDD) PMI Kabupaten Sumenep saat ini menghadapi kekurangan stok darah, terutama untuk golongan B dan O. Per hari ini, stok golongan B hanya tersisa untuk 2 hari kebutuhan, sementara golongan O untuk 3 hari. Kondisi ini membutuhkan respons cepat dari masyarakat.",
      "Proses donor darah di PMI Sumenep sangat mudah dan aman. Calon pendonor hanya perlu memenuhi syarat dasar: sehat, berusia 17–65 tahun, berat badan minimal 45 kg, dan tidak sedang dalam kondisi tertentu seperti hamil, menyusui, atau mengonsumsi obat-obatan tertentu. Proses keseluruhan hanya membutuhkan waktu sekitar 30–45 menit termasuk pemeriksaan awal dan istirahat singkat.",
      "\"Satu kantong darah yang Anda donasikan bisa dipilah menjadi tiga komponen: sel darah merah, trombosit, dan plasma. Artinya, satu kali donor bisa menyelamatkan hingga tiga nyawa sekaligus,\" jelas dr. Rizal, Kepala UDD PMI Sumenep.",
      "Bagi warga yang ingin berdonor namun tidak bisa langsung datang ke kantor PMI, tersedia layanan jemput pendonor untuk kelompok minimal 5 orang. Hubungi PMI Sumenep melalui WhatsApp untuk koordinasi.",
      "UDD PMI Sumenep berlokasi di Jl. Trunojoyo No. 45, Sumenep, buka setiap hari Senin–Sabtu pukul 08.00–14.00 WIB.",
    ],
    category: "Aksi Kemanusiaan",
    tags: ["Donor Darah", "PMI", "Stok Darah", "Kemanusiaan"],
    author: { name: "Redaksi BSS", title: "Tim Jurnalis Bulan Sabit Sumenep" },
    publishedAt: "2026-05-31T11:00:00+07:00",
    readingMinutes: 3,
    hasAudio: false,
    isVerified: false,
    heroImage: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1200&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&q=80",
  },
  {
    slug: "hipertensi-garam-masakan-madura",
    title: "Masakan Madura dan Tekanan Darah: Panduan Praktis Kurangi Garam Tanpa Hilang Rasa",
    excerpt:
      "Masakan Madura terkenal kaya bumbu dan asin. Dokter spesialis jantung berbagi strategi cerdas mengurangi asupan garam tanpa mengorbankan cita rasa khas Madura.",
    body: [
      "Prevalensi hipertensi di Kabupaten Sumenep mencapai 32,7% — lebih tinggi dari rata-rata nasional 26,2%. Salah satu faktor yang diduga berkontribusi adalah tingginya konsumsi garam dalam masakan khas Madura: soto daging, gulai kambing, bebek goreng bumbu hitam, dan berbagai jenis petis yang menjadi bumbu andalan.",
      "Dr. Hamid, spesialis jantung yang rutin bertugas di RSUD Sumenep, menjelaskan bahwa batas aman konsumsi garam adalah 5 gram (sekitar 1 sendok teh) per hari untuk orang dewasa. \"Masalahnya, satu porsi bebek goreng khas Madura sudah mengandung sekitar 3–4 gram sodium. Jika ditambah petis dan kecap, bisa melebihi batas harian dalam sekali makan,\" ujarnya.",
      "Beberapa strategi praktis yang direkomendasikan: pertama, kurangi garam secara bertahap — lidah akan beradaptasi dalam 2–3 minggu. Kedua, ganti sebagian garam dengan bumbu aromatik: kunyit, lengkuas, dan serai yang justru menambah kompleksitas rasa. Ketiga, petis yang kaya rasa bisa tetap digunakan dalam jumlah kecil sebagai pelengkap, bukan bahan utama.",
      "Untuk penderita hipertensi, penggantian garam biasa dengan garam kalium (potassium chloride) yang kini tersedia di apotek bisa menjadi pilihan — dengan catatan, penderita gagal ginjal tidak dianjurkan menggunakannya tanpa konsultasi dokter.",
      "PMI Sumenep menyelenggarakan kelas \"Masak Sehat ala Madura\" setiap bulan di kantor PMI. Peserta mendapat panduan resep masakan Madura yang dimodifikasi untuk penderita hipertensi tanpa mengorbankan cita rasa otentik.",
    ],
    pullQuote:
      "\"Satu porsi bebek goreng khas Madura sudah mengandung 3–4 gram sodium. Jika ditambah petis, bisa melebihi batas harian dalam sekali makan.\" — dr. Hamid",
    category: "Edukasi",
    tags: ["Hipertensi", "Garam", "Masakan Madura", "Jantung", "Gaya Hidup Sehat"],
    author: { name: "dr. Hamid Wibowo", title: "Spesialis Jantung, RSUD Sumenep" },
    publishedAt: "2026-05-30T09:00:00+07:00",
    readingMinutes: 5,
    hasAudio: true,
    isVerified: true,
    heroImage: "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
  },
  {
    slug: "posyandu-remaja-sumenep",
    title: "Posyandu Remaja Hadir di Sumenep: Ruang Aman Bicara Kesehatan Mental",
    excerpt:
      "Dinkes Sumenep meluncurkan 12 Posyandu Remaja baru yang menyediakan konseling kesehatan mental, reproduksi, dan anti-narkoba untuk pelajar SMP dan SMA.",
    body: [
      "Kabar baik untuk generasi muda Sumenep: Dinas Kesehatan resmi meluncurkan 12 Posyandu Remaja baru yang tersebar di 8 kecamatan, termasuk di Kepulauan Kangean. Berbeda dari posyandu balita yang sudah lama dikenal, Posyandu Remaja dirancang khusus untuk menjawab kebutuhan kesehatan usia 10–18 tahun.",
      "Layanan yang tersedia meliputi pemeriksaan kesehatan rutin, konseling kesehatan reproduksi, deteksi dini gangguan mental, serta penyuluhan tentang bahaya narkoba dan rokok. Yang membuat program ini unik: konselor sebayanya adalah remaja yang dilatih khusus, sehingga peserta merasa lebih nyaman berbicara.",
      "\"Remaja sering enggan ke puskesmas karena merasa malu atau tidak nyaman dengan suasana klinisnya. Posyandu Remaja hadir sebagai ruang yang lebih aman dan ramah untuk mereka,\" jelas Kepala Seksi Kesehatan Keluarga Dinkes Sumenep, Sri Wahyuni.",
      "PMI Sumenep berkontribusi dengan mengirimkan relawan terlatih untuk program Pertolongan Pertama Psikologis (P3) — sebuah pendekatan berbasis komunitas untuk membantu teman sebaya yang mengalami tekanan mental atau kehilangan.",
      "Bagi remaja di kepulauan, Posyandu Remaja dilayani secara periodik oleh tim keliling. Jadwal kunjungan ke masing-masing pulau dapat dilihat di papan pengumuman puskesmas setempat atau diakses melalui WhatsApp Dinkes Sumenep.",
    ],
    category: "Berita Kesehatan",
    tags: ["Remaja", "Kesehatan Mental", "Posyandu", "PMI", "Generasi Muda"],
    author: { name: "Nisa Pratiwi", title: "Jurnalis Kesehatan, Bulan Sabit Sumenep" },
    publishedAt: "2026-05-28T10:00:00+07:00",
    readingMinutes: 4,
    hasAudio: false,
    isVerified: true,
    heroImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
    thumbnailImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getRecentArticles(limit = 6, excludeSlug?: string): Article[] {
  return articles
    .filter((a) => a.slug !== excludeSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getEducationArticles(): Article[] {
  return articles.filter((a) => a.category === "Edukasi" || a.category === "Gizi");
}

export const CATEGORIES = ["Semua", "Berita Kesehatan", "Edukasi", "Kemanusiaan", "Gizi"] as const;
export type FilterCategory = (typeof CATEGORIES)[number];
