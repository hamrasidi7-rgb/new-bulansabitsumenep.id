/**
 * ============================================================
 * SEED / DUMMY DATA — Bulan Sabit Sumenep
 * ============================================================
 * File ini digunakan sebagai fallback ketika Supabase belum
 * dikonfigurasi atau tabel masih kosong.
 *
 * HAPUS referensi ke file ini (dan data ini di Supabase) setelah
 * konten produksi nyata sudah dimasukkan oleh admin.
 * ============================================================
 */

const PH = 'https://placehold.co'

// ── ARTIKEL ──────────────────────────────────────────────────────────────────

export const SEED_ARTICLES = [
  // =========================================================
  // BERITA KESEHATAN
  // =========================================================
  {
    id: 'seed-bk-01',
    title: 'RSUD dr. H. Moh. Anwar Tambah Layanan Poli Jantung',
    slug: 'rsud-sumenep-poli-jantung',
    channel: 'berita-kesehatan',
    subchannel: 'layanan-kesehatan',
    excerpt:
      'Rumah sakit rujukan utama Sumenep memperluas layanan spesialistik untuk menekan rujukan ke luar daerah.',
    content:
      '<p>RSUD dr. H. Moh. Anwar Sumenep resmi membuka Poliklinik Jantung. Layanan ini hadir untuk menekan angka rujukan pasien jantung ke Surabaya yang selama ini cukup tinggi.</p><p>Direktur RSUD menyatakan bahwa kehadiran poli jantung merupakan bagian dari rencana pengembangan layanan spesialistik jangka panjang demi kemandirian kesehatan masyarakat Sumenep.</p>',
    cover_url: `${PH}/800x450/0d9488/ffffff?text=Poli+Jantung`,
    author_name: null,
    tags: ['layanan-kesehatan', 'rsud-sumenep', 'jantung'],
    is_published: true,
    published_at: '2026-05-01T08:00:00.000Z',
  },
  {
    id: 'seed-bk-02',
    title: 'Mengenali Gejala Dini Demam Berdarah di Musim Hujan',
    slug: 'gejala-dini-demam-berdarah',
    channel: 'berita-kesehatan',
    subchannel: 'edukasi-kesehatan',
    excerpt:
      'Panduan praktis warga mengenali tanda DBD dan langkah pencegahan 3M Plus.',
    content:
      '<p>Musim hujan membawa risiko meningkatnya kasus demam berdarah dengue (DBD) di Sumenep. Dinas Kesehatan mengimbau warga untuk menerapkan 3M Plus: menguras, menutup, mendaur ulang, dan mencegah gigitan nyamuk.</p><p>Gejala awal DBD meliputi demam tinggi mendadak, nyeri otot, dan bintik merah pada kulit. Segera ke fasilitas kesehatan jika ditemukan tanda-tanda tersebut.</p>',
    cover_url: `${PH}/800x450/0284c7/ffffff?text=Demam+Berdarah`,
    author_name: null,
    tags: ['dbd', 'edukasi', 'pencegahan'],
    is_published: true,
    published_at: '2026-04-20T09:00:00.000Z',
  },
  {
    id: 'seed-bk-03',
    title: 'Program Posyandu Keliling Jangkau Kepulauan Sumenep',
    slug: 'posyandu-keliling-kepulauan-sumenep',
    channel: 'berita-kesehatan',
    subchannel: 'kesehatan-ibu-anak',
    excerpt:
      'Layanan ibu hamil dan balita kini menjangkau pulau-pulau terluar Sumenep.',
    content:
      '<p>Dinas Kesehatan Sumenep meluncurkan program Posyandu Keliling yang menjangkau kepulauan terluar. Tim kesehatan berangkat dengan kapal setiap bulan untuk memberikan layanan penimbangan, imunisasi, dan konsultasi bagi ibu hamil serta balita.</p>',
    cover_url: `${PH}/800x450/7c3aed/ffffff?text=Posyandu+Keliling`,
    author_name: null,
    tags: ['posyandu', 'kepulauan', 'ibu-anak'],
    is_published: true,
    published_at: '2026-04-15T08:30:00.000Z',
  },
  {
    id: 'seed-bk-04',
    title: 'Angka Stunting Sumenep Turun, Ini Strategi Dinkes',
    slug: 'angka-stunting-sumenep-turun',
    channel: 'berita-kesehatan',
    subchannel: 'gizi-stunting',
    excerpt:
      'Intervensi gizi spesifik dan sensitif menunjukkan hasil positif sepanjang 2025.',
    content:
      '<p>Angka stunting di Kabupaten Sumenep turun signifikan berkat program intervensi terpadu. Dinas Kesehatan bekerja sama dengan PKK, Posyandu, dan puskesmas untuk memastikan asupan gizi balita terpenuhi.</p>',
    cover_url: `${PH}/800x450/d97706/ffffff?text=Gizi+Stunting`,
    author_name: null,
    tags: ['stunting', 'gizi', 'dinkes-sumenep'],
    is_published: true,
    published_at: '2026-04-10T10:00:00.000Z',
  },
  {
    id: 'seed-bk-05',
    title: 'Pentingnya Dukungan Kesehatan Mental bagi Nelayan',
    slug: 'kesehatan-mental-nelayan-sumenep',
    channel: 'berita-kesehatan',
    subchannel: 'kesehatan-mental',
    excerpt:
      'Tekanan ekonomi dan musim paceklik berdampak pada kesejahteraan psikologis masyarakat pesisir.',
    content:
      '<p>Nelayan di pesisir dan kepulauan Sumenep rentan mengalami tekanan psikologis, terutama saat musim paceklik. Program pendampingan kesehatan jiwa kini mulai menjangkau komunitas pesisir melalui puskesmas terdekat.</p>',
    cover_url: `${PH}/800x450/059669/ffffff?text=Kesehatan+Mental`,
    author_name: null,
    tags: ['kesehatan-mental', 'nelayan', 'pesisir'],
    is_published: true,
    published_at: '2026-04-05T08:00:00.000Z',
  },
  {
    id: 'seed-bk-06',
    title: 'Pemkab Sumenep Perkuat Layanan SPBE Bidang Kesehatan',
    slug: 'spbe-layanan-kesehatan-sumenep',
    channel: 'berita-kesehatan',
    subchannel: 'kebijakan-kesehatan',
    excerpt:
      'Digitalisasi rekam medis dan rujukan terintegrasi mulai diterapkan bertahap.',
    content:
      '<p>Pemerintah Kabupaten Sumenep mempercepat implementasi Sistem Pemerintahan Berbasis Elektronik (SPBE) di sektor kesehatan. Rekam medis elektronik dan sistem rujukan terintegrasi kini sedang diujicobakan di 10 puskesmas.</p>',
    cover_url: `${PH}/800x450/1d4ed8/ffffff?text=SPBE+Kesehatan`,
    author_name: null,
    tags: ['spbe', 'digitalisasi', 'kebijakan'],
    is_published: true,
    published_at: '2026-03-30T09:00:00.000Z',
  },
  {
    id: 'seed-bk-07',
    title: 'Chatbot AI Bantu Layanan Informasi Kesehatan Warga',
    slug: 'chatbot-ai-informasi-kesehatan',
    channel: 'berita-kesehatan',
    subchannel: 'teknologi-ai-kesehatan',
    excerpt:
      'Inovasi asisten digital mempermudah akses informasi jadwal dan layanan faskes.',
    content:
      '<p>Sebuah inovasi chatbot berbasis kecerdasan buatan kini hadir untuk membantu warga Sumenep mendapatkan informasi jadwal dokter, lokasi puskesmas, dan langkah pertolongan pertama tanpa harus datang langsung ke fasilitas kesehatan.</p>',
    cover_url: `${PH}/800x450/6d28d9/ffffff?text=AI+Kesehatan`,
    author_name: null,
    tags: ['ai', 'teknologi', 'chatbot'],
    is_published: true,
    published_at: '2026-03-25T10:00:00.000Z',
  },
  {
    id: 'seed-bk-08',
    title: 'Kisah Bidan Desa di Pulau Sapudi',
    slug: 'bidan-desa-pulau-sapudi',
    channel: 'berita-kesehatan',
    subchannel: 'tokoh-kesehatan',
    excerpt:
      'Dedikasi tenaga kesehatan melayani persalinan di wilayah kepulauan terpencil.',
    content:
      '<p>Bu Halimah, bidan desa di Pulau Sapudi, telah mengabdi selama 12 tahun. Tanpa fasilitas memadai, ia menangani puluhan persalinan per tahun dengan penuh tanggung jawab dan keberanian.</p>',
    cover_url: `${PH}/800x450/b45309/ffffff?text=Bidan+Desa`,
    author_name: null,
    tags: ['bidan', 'kepulauan', 'tokoh-kesehatan'],
    is_published: true,
    published_at: '2026-03-20T08:00:00.000Z',
  },
  {
    id: 'seed-bk-09',
    title: 'Stok Darah Golongan O di Sumenep Menipis Jelang Idul Adha',
    slug: 'stok-darah-golongan-o-menipis-jelang-idul-adha',
    channel: 'berita-kesehatan',
    subchannel: 'layanan-kesehatan',
    excerpt: 'PMI Kabupaten Sumenep mencatat penurunan stok darah golongan O hingga 40% dalam dua pekan terakhir. Masyarakat diimbau segera mendonorkan darah di UDD PMI Sumenep.',
    content:
      '<p>PMI Kabupaten Sumenep mencatat penurunan stok darah golongan O hingga 40% dalam dua pekan terakhir, bertepatan dengan meningkatnya kebutuhan darah menjelang Idul Adha. Unit Donor Darah (UDD) PMI Sumenep kini hanya memiliki cadangan untuk dua hari ke depan.</p><p>Kepala UDD PMI Sumenep mengimbau masyarakat yang memenuhi syarat untuk segera mendonorkan darah. "Golongan O adalah golongan universal yang paling banyak dibutuhkan untuk transfusi darurat. Kami membutuhkan setidaknya 80 kantong per hari," ujarnya.</p><p>Masyarakat yang ingin berdonor dapat langsung datang ke UDD PMI Sumenep di Jl. Trunojoyo, buka setiap Senin–Sabtu pukul 08.00–14.00 WIB, atau menghubungi WhatsApp PMI untuk layanan jemput pendonor kelompok minimal 5 orang.</p>',
    cover_url: 'https://placehold.co/600x400/c0392b/ffffff?text=Berita+Kesehatan',
    author_name: 'Redaksi Bulan Sabit',
    tags: ['donor-darah', 'stok-darah', 'pmi', 'idul-adha'],
    is_published: true,
    published_at: '2026-06-04T08:00:00.000Z',
  },
  {
    id: 'seed-bk-10',
    title: 'Kenali Tekanan Darah Ideal Sebelum Mendonor, Ini Penjelasannya',
    slug: 'tekanan-darah-ideal-sebelum-donor',
    channel: 'berita-kesehatan',
    subchannel: 'edukasi-kesehatan',
    excerpt: 'Calon pendonor wajib memiliki tekanan darah dalam rentang aman. Pemeriksaan awal dilakukan untuk memastikan keselamatan pendonor dan kualitas darah.',
    content:
      '<p>Calon pendonor darah wajib memiliki tekanan darah dalam rentang aman sebelum diperbolehkan mendonorkan darahnya. Pemeriksaan tekanan darah merupakan bagian dari seleksi awal yang dilakukan petugas UDD PMI Sumenep untuk memastikan keselamatan pendonor dan kualitas darah yang disumbangkan.</p><p>Standar tekanan darah yang diterima adalah sistolik antara 100–160 mmHg dan diastolik antara 60–100 mmHg. Pendonor dengan tekanan darah di luar rentang ini perlu menunggu hingga kondisinya membaik dan periksa ulang.</p><p>"Bukan berarti mereka tidak boleh donor selamanya — hanya perlu penanganan dulu. Jaga pola makan rendah garam dan rutin berolahraga," jelas dr. Ahmad dari Tim Medis UDD PMI Sumenep.</p>',
    cover_url: 'https://placehold.co/600x400/c0392b/ffffff?text=Berita+Kesehatan',
    author_name: 'Tim Medis UDD PMI',
    tags: ['tekanan-darah', 'donor-darah', 'edukasi', 'pmi'],
    is_published: true,
    published_at: '2026-06-02T09:00:00.000Z',
  },

  // =========================================================
  // AKSI KEMANUSIAAN
  // =========================================================
  {
    id: 'seed-ak-01',
    title: 'Relawan Bantu Korban Banjir Rob di Pesisir Kalianget',
    slug: 'relawan-banjir-rob-kalianget',
    channel: 'aksi-kemanusiaan',
    subchannel: 'tanggap-bencana',
    excerpt:
      'Tim turun membantu evakuasi dan distribusi logistik bagi warga terdampak.',
    content:
      '<p>Banjir rob melanda pesisir Kalianget akibat gelombang tinggi yang tidak biasa. Ratusan warga harus mengungsi sementara tim relawan BSS Sumenep turun langsung untuk membantu evakuasi dan mendistribusikan logistik darurat.</p>',
    cover_url: `${PH}/800x450/dc2626/ffffff?text=Tanggap+Bencana`,
    author_name: null,
    tags: ['banjir', 'kalianget', 'relawan'],
    is_published: true,
    published_at: '2026-05-05T07:00:00.000Z',
  },
  {
    id: 'seed-ak-02',
    title: 'Aksi Donor Darah Serentak Penuhi Stok PMI Sumenep',
    slug: 'donor-darah-serentak-pmi-sumenep',
    channel: 'aksi-kemanusiaan',
    subchannel: 'donor-darah',
    excerpt:
      'Ratusan pendonor berpartisipasi mengisi kebutuhan darah jelang Idul Fitri.',
    content:
      '<p>PMI Sumenep menggelar aksi donor darah massal yang diikuti ratusan warga dari berbagai kecamatan. Kegiatan ini berhasil mengumpulkan lebih dari 200 kantong darah dari berbagai golongan untuk memenuhi stok UDD PMI Sumenep.</p>',
    cover_url: `${PH}/800x450/be123c/ffffff?text=Donor+Darah`,
    author_name: null,
    tags: ['donor-darah', 'pmi', 'sumenep'],
    is_published: true,
    published_at: '2026-04-28T08:00:00.000Z',
  },
  {
    id: 'seed-ak-03',
    title: 'Bakti Sosial Pengobatan Gratis di Kecamatan Guluk-Guluk',
    slug: 'bakti-sosial-pengobatan-gratis-guluk-guluk',
    channel: 'aksi-kemanusiaan',
    subchannel: 'bakti-sosial',
    excerpt:
      'Layanan kesehatan cuma-cuma menyasar warga kurang mampu di pelosok Sumenep.',
    content:
      '<p>Bakti sosial pengobatan gratis digelar di Kecamatan Guluk-Guluk melibatkan puluhan dokter sukarela. Lebih dari 500 warga mendapat pelayanan pemeriksaan umum, gigi, dan pembagian obat gratis.</p>',
    cover_url: `${PH}/800x450/b91c1c/ffffff?text=Bakti+Sosial`,
    author_name: null,
    tags: ['bakti-sosial', 'guluk-guluk', 'pengobatan-gratis'],
    is_published: true,
    published_at: '2026-04-18T09:00:00.000Z',
  },
  {
    id: 'seed-ak-04',
    title: 'Santunan untuk Anak Yatim dan Dhuafa Bulan Ramadan',
    slug: 'santunan-yatim-dhuafa-ramadan',
    channel: 'aksi-kemanusiaan',
    subchannel: 'bantuan-dhuafa-yatim',
    excerpt:
      'Program berbagi menjangkau ratusan penerima manfaat di seluruh Sumenep.',
    content:
      '<p>Memanfaatkan momen Ramadan penuh berkah, BSS Sumenep menyalurkan santunan kepada 350 anak yatim dan keluarga dhuafa di 15 kecamatan. Dana yang terkumpul berasal dari donasi masyarakat dan mitra lembaga.</p>',
    cover_url: `${PH}/800x450/9f1239/ffffff?text=Santunan+Yatim`,
    author_name: null,
    tags: ['santunan', 'yatim', 'ramadan', 'dhuafa'],
    is_published: true,
    published_at: '2026-04-12T10:00:00.000Z',
  },
  {
    id: 'seed-ak-05',
    title: 'Menjadi Relawan: Panggilan Hati Warga Sumenep',
    slug: 'menjadi-relawan-sumenep',
    channel: 'aksi-kemanusiaan',
    subchannel: 'relawan',
    excerpt:
      'Cerita anak muda yang menyisihkan waktu untuk kegiatan kemanusiaan.',
    content:
      '<p>Semangat relawanan tumbuh di kalangan pemuda Sumenep. Banyak dari mereka bergabung bukan karena insentif materi, melainkan karena panggilan hati untuk berbagi kepada sesama. BSS Sumenep kini memiliki lebih dari 200 relawan aktif.</p>',
    cover_url: `${PH}/800x450/881337/ffffff?text=Relawan`,
    author_name: null,
    tags: ['relawan', 'pemuda', 'kemanusiaan'],
    is_published: true,
    published_at: '2026-04-08T09:00:00.000Z',
  },
  {
    id: 'seed-ak-06',
    title: 'Setetes Darah, Sejuta Harapan: Kisah Penerima Donor',
    slug: 'setetes-darah-sejuta-harapan',
    channel: 'aksi-kemanusiaan',
    subchannel: 'kisah-kemanusiaan',
    excerpt:
      'Pengalaman pasien yang terselamatkan berkat ketersediaan darah dari PMI.',
    content:
      '<p>Ibu Mariyam (42 tahun) tak menyangka operasi caesarnya bisa berjalan lancar berkat stok darah yang cukup di PMI Sumenep. "Saya berhutang nyawa kepada para pendonor yang tidak pernah saya kenal," tuturnya dengan air mata haru.</p>',
    cover_url: `${PH}/800x450/7f1d1d/ffffff?text=Kisah+Kemanusiaan`,
    author_name: null,
    tags: ['donor-darah', 'kisah', 'pmi'],
    is_published: true,
    published_at: '2026-04-02T08:00:00.000Z',
  },
  {
    id: 'seed-ak-07',
    title: 'Program Air Bersih untuk Pulau Terpencil',
    slug: 'program-air-bersih-pulau-terpencil',
    channel: 'aksi-kemanusiaan',
    subchannel: 'program-kemanusiaan',
    excerpt:
      'Inisiatif jangka panjang mengatasi krisis air bersih di kepulauan Sumenep.',
    content:
      '<p>Sebagian besar pulau terluar Sumenep mengalami kesulitan mendapatkan air bersih. BSS Sumenep bersama mitra NGO memulai program instalasi filter air dan sumur bor di tiga pulau terpencil sebagai langkah jangka panjang.</p>',
    cover_url: `${PH}/800x450/1e3a8a/ffffff?text=Air+Bersih`,
    author_name: null,
    tags: ['air-bersih', 'kepulauan', 'program'],
    is_published: true,
    published_at: '2026-03-28T09:00:00.000Z',
  },
  {
    id: 'seed-ak-08',
    title: 'Laporan Transparansi Donasi Kuartal I 2026',
    slug: 'laporan-donasi-kuartal-1-2026',
    channel: 'aksi-kemanusiaan',
    subchannel: 'laporan-donasi',
    excerpt:
      'Rincian penerimaan dan penyaluran dana publik secara terbuka dan akuntabel.',
    content:
      '<p>BSS Sumenep menerbitkan laporan keuangan kuartal pertama 2026. Total dana yang masuk Rp 142.500.000 telah disalurkan untuk tanggap bencana, bakti sosial, dan program air bersih kepulauan. Laporan lengkap tersedia di website resmi.</p>',
    cover_url: `${PH}/800x450/312e81/ffffff?text=Laporan+Donasi`,
    author_name: null,
    tags: ['laporan', 'donasi', 'transparansi'],
    is_published: true,
    published_at: '2026-03-22T10:00:00.000Z',
  },
  {
    id: 'seed-ak-09',
    title: 'Relawan PMI Sumenep Salurkan Bantuan untuk Korban Banjir Pamekasan',
    slug: 'relawan-pmi-bantuan-banjir-pamekasan',
    channel: 'aksi-kemanusiaan',
    subchannel: 'tanggap-bencana',
    excerpt: 'Tim relawan bergerak cepat mendistribusikan logistik dan layanan kesehatan dasar. Aksi ini bagian dari kesiapsiagaan PMI menghadapi bencana di wilayah Madura.',
    content:
      '<p>Tim relawan PMI Sumenep bergerak cepat ke Pamekasan setelah banjir bandang menerjang tiga kecamatan. Sebanyak 30 relawan dikirim membawa 200 paket logistik darurat berisi sembako, air bersih, dan perlengkapan sanitasi untuk warga yang mengungsi.</p><p>Selain distribusi logistik, tim medis PMI turut memberikan layanan kesehatan dasar kepada para pengungsi, terutama anak-anak dan lansia yang rentan mengalami masalah kesehatan pascabanjir seperti diare dan infeksi saluran pernapasan.</p><p>Ketua PMI Sumenep, H. Moh. Saleh, menegaskan bahwa kesiapsiagaan bencana lintas kabupaten merupakan bagian integral dari misi kemanusiaan PMI. "Bencana tidak mengenal batas administrasi. Selama kami mampu, kami akan hadir," tegasnya.</p>',
    cover_url: 'https://placehold.co/600x400/27ae60/ffffff?text=Aksi+Kemanusiaan',
    author_name: 'Humas PMI Sumenep',
    tags: ['banjir', 'pamekasan', 'relawan', 'tanggap-bencana'],
    is_published: true,
    published_at: '2026-06-03T07:00:00.000Z',
  },
  {
    id: 'seed-ak-10',
    title: 'Donor Darah Massal di Alun-Alun Sumenep Kumpulkan 350 Kantong',
    slug: 'donor-darah-massal-alun-alun-sumenep-350-kantong',
    channel: 'aksi-kemanusiaan',
    subchannel: 'donor-darah',
    excerpt: 'Kegiatan kolaborasi PMI dan komunitas relawan ini melampaui target awal. Antusiasme warga menunjukkan tingginya kesadaran berbagi kehidupan.',
    content:
      '<p>Kegiatan donor darah massal yang digelar di Alun-Alun Sumenep berhasil mengumpulkan 350 kantong darah dari berbagai golongan, melampaui target awal 250 kantong. Ratusan warga dari berbagai kalangan antusias hadir sejak pagi hari.</p><p>Kegiatan ini merupakan kolaborasi PMI Sumenep dengan komunitas relawan lokal, OSIS SMA, dan komunitas motor sebagai bagian dari gerakan sadar donor darah yang terus digalakkan.</p><p>"Antusiasme warga Sumenep sangat luar biasa. Ini membuktikan bahwa kepedulian sosial masyarakat kita semakin tinggi," ujar koordinator panitia. Darah yang terkumpul langsung diserahkan ke UDD PMI Sumenep dan didistribusikan ke rumah sakit-rumah sakit yang membutuhkan.</p>',
    cover_url: 'https://placehold.co/600x400/27ae60/ffffff?text=Aksi+Kemanusiaan',
    author_name: 'Redaksi Bulan Sabit',
    tags: ['donor-darah', 'massal', 'alun-alun', 'sumenep'],
    is_published: true,
    published_at: '2026-05-30T08:00:00.000Z',
  },

  // =========================================================
  // DOKTER MENULIS
  // =========================================================
  {
    id: 'seed-dm-01',
    title: 'Hipertensi: Si Pembunuh Senyap yang Sering Diabaikan',
    slug: 'hipertensi-si-pembunuh-senyap',
    channel: 'dokter-menulis',
    subchannel: null,
    excerpt:
      'Mengapa tekanan darah tinggi perlu deteksi rutin meski tanpa gejala nyata.',
    content:
      '<p>Hipertensi atau tekanan darah tinggi kerap disebut <em>silent killer</em> karena tidak menimbulkan gejala nyata hingga terjadi komplikasi serius seperti stroke atau serangan jantung. Periksa tekanan darah secara rutin setidaknya setiap 6 bulan sekali, terutama bagi yang berusia di atas 40 tahun.</p><p>Gaya hidup sehat — membatasi garam, rutin berolahraga, tidak merokok — adalah kunci utama pencegahan.</p>',
    cover_url: `${PH}/800x450/1e3a8a/ffffff?text=Hipertensi`,
    author_name: 'dr. Ahmad Fauzi, Sp.PD',
    tags: ['hipertensi', 'jantung', 'edukasi-medis'],
    is_published: true,
    published_at: '2026-04-22T10:00:00.000Z',
  },
  {
    id: 'seed-dm-02',
    title: 'Memahami Imunisasi Dasar Lengkap pada Anak',
    slug: 'imunisasi-dasar-lengkap-anak',
    channel: 'dokter-menulis',
    subchannel: null,
    excerpt:
      'Jadwal dan manfaat imunisasi yang sering disalahpahami oleh orang tua.',
    content:
      '<p>Imunisasi dasar lengkap adalah hak setiap anak yang dijamin negara. Sayangnya, masih banyak orang tua yang menunda atau menolak imunisasi karena mitos yang tidak berdasar ilmu pengetahuan.</p><p>Jadwal imunisasi dimulai dari bayi baru lahir (Hepatitis B), hingga usia 18 bulan (campak-rubela booster). Vaksin aman dan efektif melindungi anak dari penyakit serius.</p>',
    cover_url: `${PH}/800x450/1d4ed8/ffffff?text=Imunisasi+Anak`,
    author_name: 'dr. Siti Aminah, Sp.A',
    tags: ['imunisasi', 'anak', 'vaksin'],
    is_published: true,
    published_at: '2026-04-14T09:00:00.000Z',
  },
  {
    id: 'seed-dm-03',
    title: 'Pola Makan Sehat ala Masyarakat Pesisir',
    slug: 'pola-makan-sehat-pesisir',
    channel: 'dokter-menulis',
    subchannel: null,
    excerpt:
      'Memanfaatkan kekayaan laut Madura untuk pola makan bergizi seimbang.',
    content:
      '<p>Ikan segar dan hasil laut Madura bukan hanya lezat, tetapi kaya protein, omega-3, dan mineral penting. Konsumsi ikan 3–4 kali seminggu terbukti menurunkan risiko penyakit jantung dan meningkatkan kecerdasan anak.</p><p>Kunci gizi seimbang pesisir: perbanyak sayur, kurangi santan berlebihan, dan ganti nasi putih sebagian dengan umbi-umbian lokal.</p>',
    cover_url: `${PH}/800x450/0369a1/ffffff?text=Gizi+Pesisir`,
    author_name: 'dr. Nurul Hidayah, M.Gizi',
    tags: ['gizi', 'pola-makan', 'pesisir', 'madura'],
    is_published: true,
    published_at: '2026-04-06T10:00:00.000Z',
  },
  {
    id: 'seed-dm-04',
    title: 'Pertolongan Pertama saat Serangan Jantung',
    slug: 'pertolongan-pertama-serangan-jantung',
    channel: 'dokter-menulis',
    subchannel: null,
    excerpt:
      'Langkah kritis menit-menit pertama yang bisa menyelamatkan nyawa.',
    content:
      '<p>Serangan jantung adalah kedaruratan medis. Setiap menit keterlambatan meningkatkan risiko kerusakan jantung permanen. Kenali gejalanya: nyeri dada seperti ditekan, sesak napas, keringat dingin, dan mual.</p><p>Langkah pertolongan pertama: hubungi 119, baringkan pasien, longgarkan pakaian, dan lakukan CPR bila pasien tidak sadar dan tidak bernapas. Jangan tunggu gejala "hilang sendiri".</p>',
    cover_url: `${PH}/800x450/0f172a/ffffff?text=Pertolongan+Pertama`,
    author_name: 'dr. Bambang Surya, Sp.JP',
    tags: ['jantung', 'pertolongan-pertama', 'darurat'],
    is_published: true,
    published_at: '2026-03-28T08:00:00.000Z',
  },
  {
    id: 'seed-dm-05',
    title: 'Mengapa Donor Darah Aman dan Menyehatkan',
    slug: 'donor-darah-aman-dan-menyehatkan',
    channel: 'dokter-menulis',
    subchannel: null,
    excerpt: 'Donor darah rutin membantu regenerasi sel darah merah dan menjaga kadar zat besi. Seorang dokter UDD membagikan pandangan medisnya untuk masyarakat awam.',
    content:
      '<p>Sebagai dokter yang bertugas di Unit Donor Darah PMI Sumenep, saya sering mendengar kekhawatiran calon pendonor: "Apakah aman? Apakah saya akan kelelahan?" Izinkan saya menjawab dengan fakta medis.</p><p>Donor darah aman dilakukan oleh orang sehat berusia 17–65 tahun, berat badan minimal 45 kg, dan kadar hemoglobin normal. Proses pengambilan darah sebanyak 350–450 mL menggunakan peralatan steril sekali pakai yang menjamin tidak ada risiko penularan penyakit.</p><p>Justru ada manfaat kesehatan yang didapat: donor darah rutin membantu menjaga kadar zat besi agar tidak berlebihan, merangsang sumsum tulang memproduksi sel darah merah baru yang lebih segar, dan sejumlah penelitian menunjukkan manfaat jangka panjang untuk kesehatan kardiovaskular. Jadi, donor darah bukan hanya menolong orang lain — Anda juga menolong diri sendiri.</p>',
    cover_url: 'https://placehold.co/600x400/2980b9/ffffff?text=Dokter+Menulis',
    author_name: 'dr. Ahmad Fauzi, Sp.PD',
    tags: ['donor-darah', 'kesehatan', 'edukasi-medis'],
    is_published: true,
    published_at: '2026-06-01T09:00:00.000Z',
  },
  {
    id: 'seed-dm-06',
    title: 'Membongkar Mitos Donor Darah Bikin Lemas',
    slug: 'mitos-donor-darah-bikin-lemas',
    channel: 'dokter-menulis',
    subchannel: null,
    excerpt: 'Banyak warga ragu mendonor karena takut lemas setelahnya. Tinjauan medis menjelaskan bahwa tubuh memulihkan volume darah dalam hitungan jam.',
    content:
      '<p>Mitos bahwa donor darah membuat tubuh lemas adalah salah satu hambatan terbesar yang mencegah banyak orang menjadi pendonor. Sebagai dokter, saya ingin meluruskan kesalahpahaman ini secara ilmiah.</p><p>Tubuh manusia memiliki mekanisme kompensasi yang luar biasa. Setelah donor darah, volume plasma akan dipulihkan dalam 24–48 jam. Sel darah merah baru terbentuk sepenuhnya dalam 4–6 minggu. Rasa lemas sesaat setelah donor biasanya disebabkan oleh kecemasan, bukan kehilangan darah itu sendiri.</p><p>Kunci agar tetap berenergi setelah donor: cukup tidur malam sebelumnya, makan dan minum yang cukup, hindari aktivitas berat dalam 24 jam pertama, dan konsumsi makanan kaya zat besi — daging merah, bayam, kacang-kacangan — dalam beberapa hari berikutnya. Dengan persiapan yang tepat, Anda bisa beraktivitas normal bahkan di hari yang sama.</p>',
    cover_url: 'https://placehold.co/600x400/2980b9/ffffff?text=Dokter+Menulis',
    author_name: 'dr. Siti Rahmawati',
    tags: ['donor-darah', 'mitos', 'edukasi-medis'],
    is_published: true,
    published_at: '2026-05-28T10:00:00.000Z',
  },
]

// ── VIDEO STORY ───────────────────────────────────────────────────────────────
// CATATAN: URL di bawah adalah PLACEHOLDER. Ganti dengan video asli melalui halaman admin.

export const SEED_VIDEOS = [
  {
    id: 'seed-vid-01',
    title: 'Pengalaman Pertama Saya Donor Darah',
    platform: 'youtube',
    video_id: 'dQw4w9WgXcQ',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    // Ganti thumbnail_url dengan thumbnail video asli setelah video diganti
    thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    description: 'Kisah pertama kali mendonorkan darah di PMI Sumenep — pengalaman yang mengubah pandangan.',
    is_published: true,
    sort_order: 1,
  },
  {
    id: 'seed-vid-02',
    title: 'Kenapa Donor Darah Itu Penting?',
    platform: 'youtube',
    video_id: 'dQw4w9WgXcQ',
    video_url: 'https://youtu.be/dQw4w9WgXcQ',
    // Ganti thumbnail_url dengan thumbnail video asli setelah video diganti
    thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    description: 'Edukasi singkat manfaat donor darah bagi pendonor dan penerima.',
    is_published: true,
    sort_order: 2,
  },
  {
    id: 'seed-vid-03',
    title: 'Aksi Donor Darah Massal di Sumenep',
    platform: 'instagram',
    video_id: 'CXXXXXXXXXX',
    video_url: 'https://www.instagram.com/reel/CXXXXXXXXXX/',
    // Ganti dengan URL Instagram Reel asli
    thumbnail_url: `${PH}/480x480/e11d48/ffffff?text=Instagram+Reel`,
    description: 'Dokumentasi aksi donor darah massal PMI Sumenep.',
    is_published: true,
    sort_order: 3,
  },
  {
    id: 'seed-vid-04',
    title: 'Cerita Relawan PMI Sumenep',
    platform: 'tiktok',
    video_id: '7000000000000000000',
    video_url: 'https://www.tiktok.com/@pmi.sumenep/video/7000000000000000000',
    // Ganti dengan URL TikTok asli
    thumbnail_url: `${PH}/480x480/020617/ffffff?text=TikTok`,
    description: 'Cerita inspiratif relawan PMI Sumenep dalam bertugas di kepulauan.',
    is_published: true,
    sort_order: 4,
  },
]

// ── GALERI ────────────────────────────────────────────────────────────────────

export const SEED_GALLERIES = [
  {
    id: 'seed-gal-01',
    title: 'Aksi Donor Darah Maret 2026',
    slug: 'aksi-donor-darah-maret-2026',
    description: 'Dokumentasi aksi donor darah massal PMI Sumenep, 15 Maret 2026.',
    category: 'donor-darah',
    cover_url: `${PH}/800x600/be123c/ffffff?text=Donor+Darah`,
    event_date: '2026-03-15',
    is_published: true,
    sort_order: 1,
    photos: [
      { id: 'seed-ph-0101', image_url: `${PH}/800x600/be123c/ffffff?text=Antrian+Pendonor`, caption: 'Antrian pendonor pagi hari di halaman Kantor PMI', sort_order: 1 },
      { id: 'seed-ph-0102', image_url: `${PH}/800x600/9f1239/ffffff?text=Pemeriksaan+Darah`, caption: 'Petugas PMI memeriksa golongan darah pendonor', sort_order: 2 },
      { id: 'seed-ph-0103', image_url: `${PH}/800x600/881337/ffffff?text=Pengambilan+Darah`, caption: 'Proses pengambilan darah berlangsung tertib', sort_order: 3 },
      { id: 'seed-ph-0104', image_url: `${PH}/800x600/7f1d1d/ffffff?text=Pasca+Donor`, caption: 'Pendonor menerima snack dan sertifikat pasca-donor', sort_order: 4 },
    ],
  },
  {
    id: 'seed-gal-02',
    title: 'Bakti Sosial Guluk-Guluk',
    slug: 'bakti-sosial-guluk-guluk-2026',
    description: 'Pengobatan gratis dan pembagian sembako di Kecamatan Guluk-Guluk, Februari 2026.',
    category: 'bakti-sosial',
    cover_url: `${PH}/800x600/dc2626/ffffff?text=Bakti+Sosial`,
    event_date: '2026-02-20',
    is_published: true,
    sort_order: 2,
    photos: [
      { id: 'seed-ph-0201', image_url: `${PH}/800x600/dc2626/ffffff?text=Pembukaan`, caption: 'Pembukaan bakti sosial oleh ketua BSS Sumenep', sort_order: 1 },
      { id: 'seed-ph-0202', image_url: `${PH}/800x600/b91c1c/ffffff?text=Pemeriksaan`, caption: 'Pemeriksaan kesehatan gratis oleh tim dokter', sort_order: 2 },
      { id: 'seed-ph-0203', image_url: `${PH}/800x600/991b1b/ffffff?text=Pembagian+Obat`, caption: 'Pembagian obat kepada warga', sort_order: 3 },
      { id: 'seed-ph-0204', image_url: `${PH}/800x600/7f1d1d/ffffff?text=Distribusi+Sembako`, caption: 'Distribusi sembako untuk keluarga kurang mampu', sort_order: 4 },
    ],
  },
  {
    id: 'seed-gal-03',
    title: 'Tanggap Bencana Banjir Kalianget',
    slug: 'tanggap-bencana-banjir-kalianget-2026',
    description: 'Dokumentasi respon cepat tim BSS Sumenep saat banjir rob di Kalianget, Januari 2026.',
    category: 'tanggap-bencana',
    cover_url: `${PH}/800x600/1d4ed8/ffffff?text=Tanggap+Bencana`,
    event_date: '2026-01-10',
    is_published: true,
    sort_order: 3,
    photos: [
      { id: 'seed-ph-0301', image_url: `${PH}/800x600/1d4ed8/ffffff?text=Kondisi+Banjir`, caption: 'Kondisi banjir rob yang merendam jalan pesisir Kalianget', sort_order: 1 },
      { id: 'seed-ph-0302', image_url: `${PH}/800x600/1e40af/ffffff?text=Tim+Evakuasi`, caption: 'Tim evakuasi BSS bergerak menggunakan perahu karet', sort_order: 2 },
      { id: 'seed-ph-0303', image_url: `${PH}/800x600/1e3a8a/ffffff?text=Distribusi+Logistik`, caption: 'Distribusi logistik bantuan kepada warga terdampak', sort_order: 3 },
      { id: 'seed-ph-0304', image_url: `${PH}/800x600/172554/ffffff?text=Warga+Menerima`, caption: 'Warga terdampak menerima bantuan sembako darurat', sort_order: 4 },
    ],
  },
  {
    id: 'seed-gal-04',
    title: 'Kegiatan Posyandu Keliling April 2026',
    slug: 'kegiatan-posyandu-keliling-april-2026',
    description: 'Layanan posyandu keliling menjangkau balita dan ibu hamil di pulau-pulau terpencil.',
    category: 'kegiatan',
    cover_url: `${PH}/800x600/16a34a/ffffff?text=Posyandu+Keliling`,
    event_date: '2026-04-05',
    is_published: true,
    sort_order: 4,
    photos: [
      { id: 'seed-ph-0401', image_url: `${PH}/800x600/16a34a/ffffff?text=Tiba+di+Pulau`, caption: 'Tim posyandu tiba di Pulau Kangean pagi hari', sort_order: 1 },
      { id: 'seed-ph-0402', image_url: `${PH}/800x600/15803d/ffffff?text=Penimbangan+Balita`, caption: 'Penimbangan dan pengukuran tinggi badan balita', sort_order: 2 },
      { id: 'seed-ph-0403', image_url: `${PH}/800x600/166534/ffffff?text=Ibu+Hamil`, caption: 'Pemeriksaan ibu hamil trimester ketiga', sort_order: 3 },
      { id: 'seed-ph-0404', image_url: `${PH}/800x600/14532d/ffffff?text=Imunisasi`, caption: 'Pemberian vitamin A dan imunisasi campak', sort_order: 4 },
    ],
  },
]

// ── Helper ────────────────────────────────────────────────────────────────────

/** Filter artikel seed berdasarkan channel & (opsional) subchannel */
export function getSeedArticles(channel, subchannel = null) {
  return SEED_ARTICLES.filter(
    (a) => a.channel === channel && (subchannel ? a.subchannel === subchannel : true),
  )
}

/** Jumlah artikel seed per subchannel dalam satu channel */
export function getSeedSubchannelCounts(channel) {
  return SEED_ARTICLES.filter((a) => a.channel === channel).reduce((acc, a) => {
    if (a.subchannel) acc[a.subchannel] = (acc[a.subchannel] ?? 0) + 1
    return acc
  }, {})
}
