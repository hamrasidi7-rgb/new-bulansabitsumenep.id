-- ============================================================
-- SEED DATA — Bulan Sabit Sumenep
-- ============================================================
-- Jalankan di Supabase SQL Editor SETELAH 001_portal_schema.sql
--
-- PENTING: Data ini hanya untuk demonstrasi & pengembangan.
-- Hapus atau nonaktifkan artikel ini setelah konten produksi
-- sudah diisi oleh admin portal.
-- ============================================================

-- ── ARTIKEL BERITA KESEHATAN ─────────────────────────────────────────────────

INSERT INTO articles (title, slug, channel, subchannel, excerpt, content, cover_url, author_name, tags, is_published, published_at) VALUES

-- SEED: layanan-kesehatan
('RSUD dr. H. Moh. Anwar Tambah Layanan Poli Jantung',
 'rsud-sumenep-poli-jantung',
 'berita-kesehatan', 'layanan-kesehatan',
 'Rumah sakit rujukan utama Sumenep memperluas layanan spesialistik untuk menekan rujukan ke luar daerah.',
 '<p>RSUD dr. H. Moh. Anwar Sumenep resmi membuka Poliklinik Jantung bagi masyarakat Sumenep dan kepulauan. Layanan ini hadir untuk menekan angka rujukan pasien jantung ke Surabaya yang selama ini cukup tinggi.</p><p>Direktur RSUD menyatakan bahwa kehadiran poli jantung merupakan bagian dari rencana pengembangan layanan spesialistik jangka panjang demi kemandirian kesehatan masyarakat Sumenep.</p>',
 'https://placehold.co/800x450/0d9488/ffffff?text=Poli+Jantung',
 NULL, ARRAY['layanan-kesehatan','rsud-sumenep','jantung'], true,
 '2026-05-01 08:00:00+07'),

-- SEED: edukasi-kesehatan
('Mengenali Gejala Dini Demam Berdarah di Musim Hujan',
 'gejala-dini-demam-berdarah',
 'berita-kesehatan', 'edukasi-kesehatan',
 'Panduan praktis warga mengenali tanda DBD dan langkah pencegahan 3M Plus.',
 '<p>Musim hujan membawa risiko meningkatnya kasus demam berdarah dengue (DBD) di Sumenep. Dinas Kesehatan mengimbau warga untuk menerapkan 3M Plus: menguras, menutup, mendaur ulang, dan mencegah gigitan nyamuk.</p><p>Gejala awal DBD meliputi demam tinggi mendadak, nyeri otot, dan bintik merah pada kulit. Segera ke fasilitas kesehatan jika ditemukan tanda-tanda tersebut.</p>',
 'https://placehold.co/800x450/0284c7/ffffff?text=Demam+Berdarah',
 NULL, ARRAY['dbd','edukasi','pencegahan'], true,
 '2026-04-20 09:00:00+07'),

-- SEED: kesehatan-ibu-anak
('Program Posyandu Keliling Jangkau Kepulauan Sumenep',
 'posyandu-keliling-kepulauan-sumenep',
 'berita-kesehatan', 'kesehatan-ibu-anak',
 'Layanan ibu hamil dan balita kini menjangkau pulau-pulau terluar Sumenep.',
 '<p>Dinas Kesehatan Sumenep meluncurkan program Posyandu Keliling yang menjangkau kepulauan terluar. Tim kesehatan berangkat dengan kapal setiap bulan untuk memberikan layanan penimbangan, imunisasi, dan konsultasi bagi ibu hamil serta balita.</p>',
 'https://placehold.co/800x450/7c3aed/ffffff?text=Posyandu+Keliling',
 NULL, ARRAY['posyandu','kepulauan','ibu-anak'], true,
 '2026-04-15 08:30:00+07'),

-- SEED: gizi-stunting
('Angka Stunting Sumenep Turun, Ini Strategi Dinkes',
 'angka-stunting-sumenep-turun',
 'berita-kesehatan', 'gizi-stunting',
 'Intervensi gizi spesifik dan sensitif menunjukkan hasil positif sepanjang 2025.',
 '<p>Angka stunting di Kabupaten Sumenep turun signifikan berkat program intervensi terpadu. Dinas Kesehatan bekerja sama dengan PKK, Posyandu, dan puskesmas untuk memastikan asupan gizi balita terpenuhi.</p>',
 'https://placehold.co/800x450/d97706/ffffff?text=Gizi+Stunting',
 NULL, ARRAY['stunting','gizi','dinkes-sumenep'], true,
 '2026-04-10 10:00:00+07'),

-- SEED: kesehatan-mental
('Pentingnya Dukungan Kesehatan Mental bagi Nelayan',
 'kesehatan-mental-nelayan-sumenep',
 'berita-kesehatan', 'kesehatan-mental',
 'Tekanan ekonomi dan musim paceklik berdampak pada kesejahteraan psikologis masyarakat pesisir.',
 '<p>Nelayan di pesisir dan kepulauan Sumenep rentan mengalami tekanan psikologis, terutama saat musim paceklik. Program pendampingan kesehatan jiwa kini mulai menjangkau komunitas pesisir melalui puskesmas terdekat.</p>',
 'https://placehold.co/800x450/059669/ffffff?text=Kesehatan+Mental',
 NULL, ARRAY['kesehatan-mental','nelayan','pesisir'], true,
 '2026-04-05 08:00:00+07'),

-- SEED: kebijakan-kesehatan
('Pemkab Sumenep Perkuat Layanan SPBE Bidang Kesehatan',
 'spbe-layanan-kesehatan-sumenep',
 'berita-kesehatan', 'kebijakan-kesehatan',
 'Digitalisasi rekam medis dan rujukan terintegrasi mulai diterapkan bertahap.',
 '<p>Pemerintah Kabupaten Sumenep mempercepat implementasi SPBE di sektor kesehatan. Rekam medis elektronik dan sistem rujukan terintegrasi kini sedang diujicobakan di 10 puskesmas.</p>',
 'https://placehold.co/800x450/1d4ed8/ffffff?text=SPBE+Kesehatan',
 NULL, ARRAY['spbe','digitalisasi','kebijakan'], true,
 '2026-03-30 09:00:00+07'),

-- SEED: teknologi-ai-kesehatan
('Chatbot AI Bantu Layanan Informasi Kesehatan Warga',
 'chatbot-ai-informasi-kesehatan',
 'berita-kesehatan', 'teknologi-ai-kesehatan',
 'Inovasi asisten digital mempermudah akses informasi jadwal dan layanan faskes.',
 '<p>Sebuah inovasi chatbot berbasis kecerdasan buatan kini hadir untuk membantu warga Sumenep mendapatkan informasi jadwal dokter, lokasi puskesmas, dan langkah pertolongan pertama tanpa harus datang langsung ke fasilitas kesehatan.</p>',
 'https://placehold.co/800x450/6d28d9/ffffff?text=AI+Kesehatan',
 NULL, ARRAY['ai','teknologi','chatbot'], true,
 '2026-03-25 10:00:00+07'),

-- SEED: tokoh-kesehatan
('Kisah Bidan Desa di Pulau Sapudi',
 'bidan-desa-pulau-sapudi',
 'berita-kesehatan', 'tokoh-kesehatan',
 'Dedikasi tenaga kesehatan melayani persalinan di wilayah kepulauan terpencil.',
 '<p>Bu Halimah, bidan desa di Pulau Sapudi, telah mengabdi selama 12 tahun. Tanpa fasilitas memadai, ia menangani puluhan persalinan per tahun dengan penuh tanggung jawab dan keberanian.</p>',
 'https://placehold.co/800x450/b45309/ffffff?text=Bidan+Desa',
 NULL, ARRAY['bidan','kepulauan','tokoh-kesehatan'], true,
 '2026-03-20 08:00:00+07');

-- ── ARTIKEL AKSI KEMANUSIAAN ─────────────────────────────────────────────────

INSERT INTO articles (title, slug, channel, subchannel, excerpt, content, cover_url, author_name, tags, is_published, published_at) VALUES

-- SEED: tanggap-bencana
('Relawan Bantu Korban Banjir Rob di Pesisir Kalianget',
 'relawan-banjir-rob-kalianget',
 'aksi-kemanusiaan', 'tanggap-bencana',
 'Tim turun membantu evakuasi dan distribusi logistik bagi warga terdampak.',
 '<p>Banjir rob melanda pesisir Kalianget akibat gelombang tinggi yang tidak biasa. Ratusan warga harus mengungsi sementara tim relawan BSS Sumenep turun langsung untuk membantu evakuasi dan mendistribusikan logistik darurat.</p>',
 'https://placehold.co/800x450/dc2626/ffffff?text=Tanggap+Bencana',
 NULL, ARRAY['banjir','kalianget','relawan'], true,
 '2026-05-05 07:00:00+07'),

-- SEED: donor-darah
('Aksi Donor Darah Serentak Penuhi Stok PMI Sumenep',
 'donor-darah-serentak-pmi-sumenep',
 'aksi-kemanusiaan', 'donor-darah',
 'Ratusan pendonor berpartisipasi mengisi kebutuhan darah jelang Idul Fitri.',
 '<p>PMI Sumenep menggelar aksi donor darah massal yang diikuti ratusan warga dari berbagai kecamatan. Kegiatan ini berhasil mengumpulkan lebih dari 200 kantong darah dari berbagai golongan.</p>',
 'https://placehold.co/800x450/be123c/ffffff?text=Donor+Darah',
 NULL, ARRAY['donor-darah','pmi','sumenep'], true,
 '2026-04-28 08:00:00+07'),

-- SEED: bakti-sosial
('Bakti Sosial Pengobatan Gratis di Kecamatan Guluk-Guluk',
 'bakti-sosial-pengobatan-gratis-guluk-guluk',
 'aksi-kemanusiaan', 'bakti-sosial',
 'Layanan kesehatan cuma-cuma menyasar warga kurang mampu di pelosok Sumenep.',
 '<p>Bakti sosial pengobatan gratis digelar di Kecamatan Guluk-Guluk melibatkan puluhan dokter sukarela. Lebih dari 500 warga mendapat pelayanan pemeriksaan umum, gigi, dan pembagian obat gratis.</p>',
 'https://placehold.co/800x450/b91c1c/ffffff?text=Bakti+Sosial',
 NULL, ARRAY['bakti-sosial','guluk-guluk','pengobatan-gratis'], true,
 '2026-04-18 09:00:00+07'),

-- SEED: bantuan-dhuafa-yatim
('Santunan untuk Anak Yatim dan Dhuafa Bulan Ramadan',
 'santunan-yatim-dhuafa-ramadan',
 'aksi-kemanusiaan', 'bantuan-dhuafa-yatim',
 'Program berbagi menjangkau ratusan penerima manfaat di seluruh Sumenep.',
 '<p>Memanfaatkan momen Ramadan, BSS Sumenep menyalurkan santunan kepada 350 anak yatim dan keluarga dhuafa di 15 kecamatan. Dana yang terkumpul berasal dari donasi masyarakat dan mitra lembaga.</p>',
 'https://placehold.co/800x450/9f1239/ffffff?text=Santunan+Yatim',
 NULL, ARRAY['santunan','yatim','ramadan','dhuafa'], true,
 '2026-04-12 10:00:00+07'),

-- SEED: relawan
('Menjadi Relawan: Panggilan Hati Warga Sumenep',
 'menjadi-relawan-sumenep',
 'aksi-kemanusiaan', 'relawan',
 'Cerita anak muda yang menyisihkan waktu untuk kegiatan kemanusiaan.',
 '<p>Semangat relawanan tumbuh di kalangan pemuda Sumenep. BSS Sumenep kini memiliki lebih dari 200 relawan aktif yang bergabung karena panggilan hati untuk berbagi kepada sesama.</p>',
 'https://placehold.co/800x450/881337/ffffff?text=Relawan',
 NULL, ARRAY['relawan','pemuda','kemanusiaan'], true,
 '2026-04-08 09:00:00+07'),

-- SEED: kisah-kemanusiaan
('Setetes Darah, Sejuta Harapan: Kisah Penerima Donor',
 'setetes-darah-sejuta-harapan',
 'aksi-kemanusiaan', 'kisah-kemanusiaan',
 'Pengalaman pasien yang terselamatkan berkat ketersediaan darah dari PMI.',
 '<p>Ibu Mariyam (42 tahun) tak menyangka operasi caesarnya bisa berjalan lancar berkat stok darah yang cukup di PMI Sumenep. "Saya berhutang nyawa kepada para pendonor yang tidak pernah saya kenal," tuturnya dengan haru.</p>',
 'https://placehold.co/800x450/7f1d1d/ffffff?text=Kisah+Kemanusiaan',
 NULL, ARRAY['donor-darah','kisah','pmi'], true,
 '2026-04-02 08:00:00+07'),

-- SEED: program-kemanusiaan
('Program Air Bersih untuk Pulau Terpencil',
 'program-air-bersih-pulau-terpencil',
 'aksi-kemanusiaan', 'program-kemanusiaan',
 'Inisiatif jangka panjang mengatasi krisis air bersih di kepulauan Sumenep.',
 '<p>BSS Sumenep bersama mitra NGO memulai program instalasi filter air dan sumur bor di tiga pulau terpencil sebagai langkah jangka panjang mengatasi krisis air bersih.</p>',
 'https://placehold.co/800x450/1e3a8a/ffffff?text=Air+Bersih',
 NULL, ARRAY['air-bersih','kepulauan','program'], true,
 '2026-03-28 09:00:00+07'),

-- SEED: laporan-donasi
('Laporan Transparansi Donasi Kuartal I 2026',
 'laporan-donasi-kuartal-1-2026',
 'aksi-kemanusiaan', 'laporan-donasi',
 'Rincian penerimaan dan penyaluran dana publik secara terbuka dan akuntabel.',
 '<p>BSS Sumenep menerbitkan laporan keuangan kuartal pertama 2026. Total dana Rp 142.500.000 telah disalurkan untuk tanggap bencana, bakti sosial, dan program air bersih kepulauan.</p>',
 'https://placehold.co/800x450/312e81/ffffff?text=Laporan+Donasi',
 NULL, ARRAY['laporan','donasi','transparansi'], true,
 '2026-03-22 10:00:00+07');

-- ── ARTIKEL DOKTER MENULIS ────────────────────────────────────────────────────

INSERT INTO articles (title, slug, channel, subchannel, excerpt, content, cover_url, author_name, tags, is_published, published_at) VALUES

-- SEED: dokter-menulis
('Hipertensi: Si Pembunuh Senyap yang Sering Diabaikan',
 'hipertensi-si-pembunuh-senyap',
 'dokter-menulis', NULL,
 'Mengapa tekanan darah tinggi perlu deteksi rutin meski tanpa gejala nyata.',
 '<p>Hipertensi atau tekanan darah tinggi kerap disebut <em>silent killer</em> karena tidak menimbulkan gejala nyata hingga terjadi komplikasi serius seperti stroke atau serangan jantung.</p><p>Periksa tekanan darah secara rutin setidaknya setiap 6 bulan sekali, terutama bagi yang berusia di atas 40 tahun.</p>',
 'https://placehold.co/800x450/1e3a8a/ffffff?text=Hipertensi',
 'dr. Ahmad Fauzi, Sp.PD',
 ARRAY['hipertensi','jantung','edukasi-medis'], true,
 '2026-04-22 10:00:00+07'),

('Memahami Imunisasi Dasar Lengkap pada Anak',
 'imunisasi-dasar-lengkap-anak',
 'dokter-menulis', NULL,
 'Jadwal dan manfaat imunisasi yang sering disalahpahami oleh orang tua.',
 '<p>Imunisasi dasar lengkap adalah hak setiap anak yang dijamin negara. Sayangnya, masih banyak orang tua yang menunda imunisasi karena mitos yang tidak berdasar ilmu pengetahuan.</p>',
 'https://placehold.co/800x450/1d4ed8/ffffff?text=Imunisasi+Anak',
 'dr. Siti Aminah, Sp.A',
 ARRAY['imunisasi','anak','vaksin'], true,
 '2026-04-14 09:00:00+07'),

('Pola Makan Sehat ala Masyarakat Pesisir',
 'pola-makan-sehat-pesisir',
 'dokter-menulis', NULL,
 'Memanfaatkan kekayaan laut Madura untuk pola makan bergizi seimbang.',
 '<p>Ikan segar dan hasil laut Madura bukan hanya lezat, tetapi kaya protein, omega-3, dan mineral penting. Konsumsi ikan 3–4 kali seminggu terbukti menurunkan risiko penyakit jantung dan meningkatkan kecerdasan anak.</p>',
 'https://placehold.co/800x450/0369a1/ffffff?text=Gizi+Pesisir',
 'dr. Nurul Hidayah, M.Gizi',
 ARRAY['gizi','pola-makan','pesisir','madura'], true,
 '2026-04-06 10:00:00+07'),

('Pertolongan Pertama saat Serangan Jantung',
 'pertolongan-pertama-serangan-jantung',
 'dokter-menulis', NULL,
 'Langkah kritis menit-menit pertama yang bisa menyelamatkan nyawa.',
 '<p>Serangan jantung adalah kedaruratan medis. Setiap menit keterlambatan meningkatkan risiko kerusakan jantung permanen. Kenali gejalanya: nyeri dada, sesak napas, keringat dingin, dan mual.</p><p>Segera hubungi 119 dan lakukan CPR bila pasien tidak sadar dan tidak bernapas.</p>',
 'https://placehold.co/800x450/0f172a/ffffff?text=Pertolongan+Pertama',
 'dr. Bambang Surya, Sp.JP',
 ARRAY['jantung','pertolongan-pertama','darurat'], true,
 '2026-03-28 08:00:00+07');

-- ── VIDEO STORY ───────────────────────────────────────────────────────────────
-- CATATAN: URL video di bawah adalah PLACEHOLDER. Ganti lewat halaman admin.

INSERT INTO videos (title, platform, video_id, video_url, thumbnail_url, description, is_published, sort_order) VALUES

-- SEED VIDEO 1
('Pengalaman Pertama Saya Donor Darah',
 'youtube', 'dQw4w9WgXcQ',
 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
 'Kisah pertama kali mendonorkan darah di PMI Sumenep — pengalaman yang mengubah pandangan.',
 true, 1),

-- SEED VIDEO 2
('Kenapa Donor Darah Itu Penting?',
 'youtube', 'dQw4w9WgXcQ',
 'https://youtu.be/dQw4w9WgXcQ',
 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
 'Edukasi singkat manfaat donor darah bagi pendonor dan penerima.',
 true, 2),

-- SEED VIDEO 3 — ganti video_url dengan Reel Instagram asli
('Aksi Donor Darah Massal di Sumenep',
 'instagram', 'CXXXXXXXXXX',
 'https://www.instagram.com/reel/CXXXXXXXXXX/',
 'https://placehold.co/480x480/e11d48/ffffff?text=Instagram+Reel',
 'Dokumentasi aksi donor darah massal PMI Sumenep.',
 true, 3),

-- SEED VIDEO 4 — ganti video_url dengan TikTok asli
('Cerita Relawan PMI Sumenep',
 'tiktok', '7000000000000000000',
 'https://www.tiktok.com/@pmi.sumenep/video/7000000000000000000',
 'https://placehold.co/480x480/020617/ffffff?text=TikTok',
 'Cerita inspiratif relawan PMI Sumenep dalam bertugas di kepulauan.',
 true, 4);

-- ── GALERI ────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  gal_01 uuid;
  gal_02 uuid;
  gal_03 uuid;
  gal_04 uuid;
BEGIN

-- Album 1: Donor Darah
INSERT INTO galleries (title, slug, description, cover_url, event_date, category, is_published, sort_order)
VALUES (
  'Aksi Donor Darah Maret 2026',
  'aksi-donor-darah-maret-2026',
  'Dokumentasi aksi donor darah massal PMI Sumenep, 15 Maret 2026.',
  'https://placehold.co/800x600/be123c/ffffff?text=Donor+Darah',
  '2026-03-15', 'donor-darah', true, 1
) RETURNING id INTO gal_01;

INSERT INTO gallery_photos (gallery_id, image_url, caption, sort_order) VALUES
(gal_01, 'https://placehold.co/800x600/be123c/ffffff?text=Antrian+Pendonor',   'Antrian pendonor pagi hari di halaman Kantor PMI', 1),
(gal_01, 'https://placehold.co/800x600/9f1239/ffffff?text=Pemeriksaan+Darah',  'Petugas PMI memeriksa golongan darah pendonor',     2),
(gal_01, 'https://placehold.co/800x600/881337/ffffff?text=Pengambilan+Darah',  'Proses pengambilan darah berlangsung tertib',        3),
(gal_01, 'https://placehold.co/800x600/7f1d1d/ffffff?text=Pasca+Donor',        'Pendonor menerima snack dan sertifikat pasca-donor', 4);

-- Album 2: Bakti Sosial
INSERT INTO galleries (title, slug, description, cover_url, event_date, category, is_published, sort_order)
VALUES (
  'Bakti Sosial Guluk-Guluk',
  'bakti-sosial-guluk-guluk-2026',
  'Pengobatan gratis dan pembagian sembako di Kecamatan Guluk-Guluk, Februari 2026.',
  'https://placehold.co/800x600/dc2626/ffffff?text=Bakti+Sosial',
  '2026-02-20', 'bakti-sosial', true, 2
) RETURNING id INTO gal_02;

INSERT INTO gallery_photos (gallery_id, image_url, caption, sort_order) VALUES
(gal_02, 'https://placehold.co/800x600/dc2626/ffffff?text=Pembukaan',        'Pembukaan bakti sosial oleh ketua BSS Sumenep',        1),
(gal_02, 'https://placehold.co/800x600/b91c1c/ffffff?text=Pemeriksaan',      'Pemeriksaan kesehatan gratis oleh tim dokter',          2),
(gal_02, 'https://placehold.co/800x600/991b1b/ffffff?text=Pembagian+Obat',   'Pembagian obat kepada warga',                          3),
(gal_02, 'https://placehold.co/800x600/7f1d1d/ffffff?text=Distribusi',       'Distribusi sembako untuk keluarga kurang mampu',        4);

-- Album 3: Tanggap Bencana
INSERT INTO galleries (title, slug, description, cover_url, event_date, category, is_published, sort_order)
VALUES (
  'Tanggap Bencana Banjir Kalianget',
  'tanggap-bencana-banjir-kalianget-2026',
  'Dokumentasi respon cepat tim BSS Sumenep saat banjir rob di Kalianget, Januari 2026.',
  'https://placehold.co/800x600/1d4ed8/ffffff?text=Tanggap+Bencana',
  '2026-01-10', 'tanggap-bencana', true, 3
) RETURNING id INTO gal_03;

INSERT INTO gallery_photos (gallery_id, image_url, caption, sort_order) VALUES
(gal_03, 'https://placehold.co/800x600/1d4ed8/ffffff?text=Kondisi+Banjir',   'Kondisi banjir rob yang merendam jalan pesisir Kalianget',         1),
(gal_03, 'https://placehold.co/800x600/1e40af/ffffff?text=Tim+Evakuasi',     'Tim evakuasi BSS bergerak menggunakan perahu karet',               2),
(gal_03, 'https://placehold.co/800x600/1e3a8a/ffffff?text=Distribusi',       'Distribusi logistik bantuan kepada warga terdampak',               3),
(gal_03, 'https://placehold.co/800x600/172554/ffffff?text=Bantuan',          'Warga terdampak menerima bantuan sembako darurat',                 4);

-- Album 4: Posyandu Keliling
INSERT INTO galleries (title, slug, description, cover_url, event_date, category, is_published, sort_order)
VALUES (
  'Kegiatan Posyandu Keliling April 2026',
  'kegiatan-posyandu-keliling-april-2026',
  'Layanan posyandu keliling menjangkau balita dan ibu hamil di pulau-pulau terpencil.',
  'https://placehold.co/800x600/16a34a/ffffff?text=Posyandu+Keliling',
  '2026-04-05', 'kegiatan', true, 4
) RETURNING id INTO gal_04;

INSERT INTO gallery_photos (gallery_id, image_url, caption, sort_order) VALUES
(gal_04, 'https://placehold.co/800x600/16a34a/ffffff?text=Tiba+di+Pulau',    'Tim posyandu tiba di Pulau Kangean pagi hari',               1),
(gal_04, 'https://placehold.co/800x600/15803d/ffffff?text=Penimbangan',      'Penimbangan dan pengukuran tinggi badan balita',             2),
(gal_04, 'https://placehold.co/800x600/166534/ffffff?text=Ibu+Hamil',        'Pemeriksaan ibu hamil trimester ketiga',                     3),
(gal_04, 'https://placehold.co/800x600/14532d/ffffff?text=Imunisasi',        'Pemberian vitamin A dan imunisasi campak',                   4);

END $$;
