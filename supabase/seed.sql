-- ============================================================
-- Seed Data Bulan Sabit Sumenep — Supabase
-- Jalankan SETELAH schema.sql berhasil dieksekusi.
-- Supabase Dashboard → SQL Editor → New Query → paste → Run
-- ============================================================

-- ── ARTIKEL ──────────────────────────────────────────────────────────────────

insert into articles (id, title, slug, channel, subchannel, excerpt, content, cover_url, author_name, tags, is_published, published_at) values

-- BERITA KESEHATAN
('seed-bk-01', 'RSUD dr. H. Moh. Anwar Tambah Layanan Poli Jantung', 'rsud-sumenep-poli-jantung', 'berita-kesehatan', 'layanan-kesehatan',
 'Rumah sakit rujukan utama Sumenep memperluas layanan spesialistik untuk menekan rujukan ke luar daerah.',
 '<p>RSUD dr. H. Moh. Anwar Sumenep resmi membuka Poliklinik Jantung. Layanan ini hadir untuk menekan angka rujukan pasien jantung ke Surabaya yang selama ini cukup tinggi.</p><p>Direktur RSUD menyatakan bahwa kehadiran poli jantung merupakan bagian dari rencana pengembangan layanan spesialistik jangka panjang demi kemandirian kesehatan masyarakat Sumenep.</p>',
 'https://placehold.co/800x450/0d9488/ffffff?text=Poli+Jantung', null, array['layanan-kesehatan','rsud-sumenep','jantung'], true, '2026-05-01T08:00:00.000Z'),

('seed-bk-02', 'Mengenali Gejala Dini Demam Berdarah di Musim Hujan', 'gejala-dini-demam-berdarah', 'berita-kesehatan', 'edukasi-kesehatan',
 'Panduan praktis warga mengenali tanda DBD dan langkah pencegahan 3M Plus.',
 '<p>Musim hujan membawa risiko meningkatnya kasus demam berdarah dengue (DBD) di Sumenep. Dinas Kesehatan mengimbau warga untuk menerapkan 3M Plus: menguras, menutup, mendaur ulang, dan mencegah gigitan nyamuk.</p><p>Gejala awal DBD meliputi demam tinggi mendadak, nyeri otot, dan bintik merah pada kulit. Segera ke fasilitas kesehatan jika ditemukan tanda-tanda tersebut.</p>',
 'https://placehold.co/800x450/0284c7/ffffff?text=Demam+Berdarah', null, array['dbd','edukasi','pencegahan'], true, '2026-04-20T09:00:00.000Z'),

('seed-bk-03', 'Program Posyandu Keliling Jangkau Kepulauan Sumenep', 'posyandu-keliling-kepulauan-sumenep', 'berita-kesehatan', 'kesehatan-ibu-anak',
 'Layanan ibu hamil dan balita kini menjangkau pulau-pulau terluar Sumenep.',
 '<p>Dinas Kesehatan Sumenep meluncurkan program Posyandu Keliling yang menjangkau kepulauan terluar. Tim kesehatan berangkat dengan kapal setiap bulan untuk memberikan layanan penimbangan, imunisasi, dan konsultasi bagi ibu hamil serta balita.</p>',
 'https://placehold.co/800x450/7c3aed/ffffff?text=Posyandu+Keliling', null, array['posyandu','kepulauan','ibu-anak'], true, '2026-04-15T08:30:00.000Z'),

('seed-bk-04', 'Angka Stunting Sumenep Turun, Ini Strategi Dinkes', 'angka-stunting-sumenep-turun', 'berita-kesehatan', 'gizi-stunting',
 'Intervensi gizi spesifik dan sensitif menunjukkan hasil positif sepanjang 2025.',
 '<p>Angka stunting di Kabupaten Sumenep turun signifikan berkat program intervensi terpadu. Dinas Kesehatan bekerja sama dengan PKK, Posyandu, dan puskesmas untuk memastikan asupan gizi balita terpenuhi.</p>',
 'https://placehold.co/800x450/d97706/ffffff?text=Gizi+Stunting', null, array['stunting','gizi','dinkes-sumenep'], true, '2026-04-10T10:00:00.000Z'),

('seed-bk-05', 'Pentingnya Dukungan Kesehatan Mental bagi Nelayan', 'kesehatan-mental-nelayan-sumenep', 'berita-kesehatan', 'kesehatan-mental',
 'Tekanan ekonomi dan musim paceklik berdampak pada kesejahteraan psikologis masyarakat pesisir.',
 '<p>Nelayan di pesisir dan kepulauan Sumenep rentan mengalami tekanan psikologis, terutama saat musim paceklik. Program pendampingan kesehatan jiwa kini mulai menjangkau komunitas pesisir melalui puskesmas terdekat.</p>',
 'https://placehold.co/800x450/059669/ffffff?text=Kesehatan+Mental', null, array['kesehatan-mental','nelayan','pesisir'], true, '2026-04-05T08:00:00.000Z'),

('seed-bk-06', 'Pemkab Sumenep Perkuat Layanan SPBE Bidang Kesehatan', 'spbe-layanan-kesehatan-sumenep', 'berita-kesehatan', 'kebijakan-kesehatan',
 'Digitalisasi rekam medis dan rujukan terintegrasi mulai diterapkan bertahap.',
 '<p>Pemerintah Kabupaten Sumenep mempercepat implementasi Sistem Pemerintahan Berbasis Elektronik (SPBE) di sektor kesehatan. Rekam medis elektronik dan sistem rujukan terintegrasi kini sedang diujicobakan di 10 puskesmas.</p>',
 'https://placehold.co/800x450/1d4ed8/ffffff?text=SPBE+Kesehatan', null, array['spbe','digitalisasi','kebijakan'], true, '2026-03-30T09:00:00.000Z'),

('seed-bk-07', 'Chatbot AI Bantu Layanan Informasi Kesehatan Warga', 'chatbot-ai-informasi-kesehatan', 'berita-kesehatan', 'teknologi-ai-kesehatan',
 'Inovasi asisten digital mempermudah akses informasi jadwal dan layanan faskes.',
 '<p>Sebuah inovasi chatbot berbasis kecerdasan buatan kini hadir untuk membantu warga Sumenep mendapatkan informasi jadwal dokter, lokasi puskesmas, dan langkah pertolongan pertama tanpa harus datang langsung ke fasilitas kesehatan.</p>',
 'https://placehold.co/800x450/6d28d9/ffffff?text=AI+Kesehatan', null, array['ai','teknologi','chatbot'], true, '2026-03-25T10:00:00.000Z'),

('seed-bk-08', 'Kisah Bidan Desa di Pulau Sapudi', 'bidan-desa-pulau-sapudi', 'berita-kesehatan', 'tokoh-kesehatan',
 'Dedikasi tenaga kesehatan melayani persalinan di wilayah kepulauan terpencil.',
 '<p>Bu Halimah, bidan desa di Pulau Sapudi, telah mengabdi selama 12 tahun. Tanpa fasilitas memadai, ia menangani puluhan persalinan per tahun dengan penuh tanggung jawab dan keberanian.</p>',
 'https://placehold.co/800x450/b45309/ffffff?text=Bidan+Desa', null, array['bidan','kepulauan','tokoh-kesehatan'], true, '2026-03-20T08:00:00.000Z'),

('seed-bk-09', 'Stok Darah Golongan O di Sumenep Menipis Jelang Idul Adha', 'stok-darah-golongan-o-menipis-jelang-idul-adha', 'berita-kesehatan', 'layanan-kesehatan',
 'PMI Kabupaten Sumenep mencatat penurunan stok darah golongan O hingga 40% dalam dua pekan terakhir. Masyarakat diimbau segera mendonorkan darah di UDD PMI Sumenep.',
 '<p>PMI Kabupaten Sumenep mencatat penurunan stok darah golongan O hingga 40% dalam dua pekan terakhir, bertepatan dengan meningkatnya kebutuhan darah menjelang Idul Adha. Unit Donor Darah (UDD) PMI Sumenep kini hanya memiliki cadangan untuk dua hari ke depan.</p><p>Kepala UDD PMI Sumenep mengimbau masyarakat yang memenuhi syarat untuk segera mendonorkan darah. "Golongan O adalah golongan universal yang paling banyak dibutuhkan untuk transfusi darurat. Kami membutuhkan setidaknya 80 kantong per hari," ujarnya.</p><p>Masyarakat yang ingin berdonor dapat langsung datang ke UDD PMI Sumenep di Jl. Trunojoyo, buka setiap Senin–Sabtu pukul 08.00–14.00 WIB, atau menghubungi WhatsApp PMI untuk layanan jemput pendonor kelompok minimal 5 orang.</p>',
 'https://placehold.co/600x400/c0392b/ffffff?text=Berita+Kesehatan', 'Redaksi Bulan Sabit', array['donor-darah','stok-darah','pmi','idul-adha'], true, '2026-06-04T08:00:00.000Z'),

('seed-bk-10', 'Kenali Tekanan Darah Ideal Sebelum Mendonor, Ini Penjelasannya', 'tekanan-darah-ideal-sebelum-donor', 'berita-kesehatan', 'edukasi-kesehatan',
 'Calon pendonor wajib memiliki tekanan darah dalam rentang aman. Pemeriksaan awal dilakukan untuk memastikan keselamatan pendonor dan kualitas darah.',
 '<p>Calon pendonor darah wajib memiliki tekanan darah dalam rentang aman sebelum diperbolehkan mendonorkan darahnya. Pemeriksaan tekanan darah merupakan bagian dari seleksi awal yang dilakukan petugas UDD PMI Sumenep untuk memastikan keselamatan pendonor dan kualitas darah yang disumbangkan.</p><p>Standar tekanan darah yang diterima adalah sistolik antara 100–160 mmHg dan diastolik antara 60–100 mmHg. Pendonor dengan tekanan darah di luar rentang ini perlu menunggu hingga kondisinya membaik dan periksa ulang.</p><p>"Bukan berarti mereka tidak boleh donor selamanya — hanya perlu penanganan dulu. Jaga pola makan rendah garam dan rutin berolahraga," jelas dr. Ahmad dari Tim Medis UDD PMI Sumenep.</p>',
 'https://placehold.co/600x400/c0392b/ffffff?text=Berita+Kesehatan', 'Tim Medis UDD PMI', array['tekanan-darah','donor-darah','edukasi','pmi'], true, '2026-06-02T09:00:00.000Z'),

-- AKSI KEMANUSIAAN
('seed-ak-01', 'Relawan Bantu Korban Banjir Rob di Pesisir Kalianget', 'relawan-banjir-rob-kalianget', 'aksi-kemanusiaan', 'tanggap-bencana',
 'Tim turun membantu evakuasi dan distribusi logistik bagi warga terdampak.',
 '<p>Banjir rob melanda pesisir Kalianget akibat gelombang tinggi yang tidak biasa. Ratusan warga harus mengungsi sementara tim relawan BSS Sumenep turun langsung untuk membantu evakuasi dan mendistribusikan logistik darurat.</p>',
 'https://placehold.co/800x450/dc2626/ffffff?text=Tanggap+Bencana', null, array['banjir','kalianget','relawan'], true, '2026-05-05T07:00:00.000Z'),

('seed-ak-02', 'Aksi Donor Darah Serentak Penuhi Stok PMI Sumenep', 'donor-darah-serentak-pmi-sumenep', 'aksi-kemanusiaan', 'donor-darah',
 'Ratusan pendonor berpartisipasi mengisi kebutuhan darah jelang Idul Fitri.',
 '<p>PMI Sumenep menggelar aksi donor darah massal yang diikuti ratusan warga dari berbagai kecamatan. Kegiatan ini berhasil mengumpulkan lebih dari 200 kantong darah dari berbagai golongan untuk memenuhi stok UDD PMI Sumenep.</p>',
 'https://placehold.co/800x450/be123c/ffffff?text=Donor+Darah', null, array['donor-darah','pmi','sumenep'], true, '2026-04-28T08:00:00.000Z'),

('seed-ak-03', 'Bakti Sosial Pengobatan Gratis di Kecamatan Guluk-Guluk', 'bakti-sosial-pengobatan-gratis-guluk-guluk', 'aksi-kemanusiaan', 'bakti-sosial',
 'Layanan kesehatan cuma-cuma menyasar warga kurang mampu di pelosok Sumenep.',
 '<p>Bakti sosial pengobatan gratis digelar di Kecamatan Guluk-Guluk melibatkan puluhan dokter sukarela. Lebih dari 500 warga mendapat pelayanan pemeriksaan umum, gigi, dan pembagian obat gratis.</p>',
 'https://placehold.co/800x450/b91c1c/ffffff?text=Bakti+Sosial', null, array['bakti-sosial','guluk-guluk','pengobatan-gratis'], true, '2026-04-18T09:00:00.000Z'),

('seed-ak-04', 'Santunan untuk Anak Yatim dan Dhuafa Bulan Ramadan', 'santunan-yatim-dhuafa-ramadan', 'aksi-kemanusiaan', 'bantuan-dhuafa-yatim',
 'Program berbagi menjangkau ratusan penerima manfaat di seluruh Sumenep.',
 '<p>Memanfaatkan momen Ramadan penuh berkah, BSS Sumenep menyalurkan santunan kepada 350 anak yatim dan keluarga dhuafa di 15 kecamatan. Dana yang terkumpul berasal dari donasi masyarakat dan mitra lembaga.</p>',
 'https://placehold.co/800x450/9f1239/ffffff?text=Santunan+Yatim', null, array['santunan','yatim','ramadan','dhuafa'], true, '2026-04-12T10:00:00.000Z'),

('seed-ak-05', 'Menjadi Relawan: Panggilan Hati Warga Sumenep', 'menjadi-relawan-sumenep', 'aksi-kemanusiaan', 'relawan',
 'Cerita anak muda yang menyisihkan waktu untuk kegiatan kemanusiaan.',
 '<p>Semangat relawanan tumbuh di kalangan pemuda Sumenep. Banyak dari mereka bergabung bukan karena insentif materi, melainkan karena panggilan hati untuk berbagi kepada sesama. BSS Sumenep kini memiliki lebih dari 200 relawan aktif.</p>',
 'https://placehold.co/800x450/881337/ffffff?text=Relawan', null, array['relawan','pemuda','kemanusiaan'], true, '2026-04-08T09:00:00.000Z'),

('seed-ak-06', 'Setetes Darah, Sejuta Harapan: Kisah Penerima Donor', 'setetes-darah-sejuta-harapan', 'aksi-kemanusiaan', 'kisah-kemanusiaan',
 'Pengalaman pasien yang terselamatkan berkat ketersediaan darah dari PMI.',
 '<p>Ibu Mariyam (42 tahun) tak menyangka operasi caesarnya bisa berjalan lancar berkat stok darah yang cukup di PMI Sumenep. "Saya berhutang nyawa kepada para pendonor yang tidak pernah saya kenal," tuturnya dengan air mata haru.</p>',
 'https://placehold.co/800x450/7f1d1d/ffffff?text=Kisah+Kemanusiaan', null, array['donor-darah','kisah','pmi'], true, '2026-04-02T08:00:00.000Z'),

('seed-ak-07', 'Program Air Bersih untuk Pulau Terpencil', 'program-air-bersih-pulau-terpencil', 'aksi-kemanusiaan', 'program-kemanusiaan',
 'Inisiatif jangka panjang mengatasi krisis air bersih di kepulauan Sumenep.',
 '<p>Sebagian besar pulau terluar Sumenep mengalami kesulitan mendapatkan air bersih. BSS Sumenep bersama mitra NGO memulai program instalasi filter air dan sumur bor di tiga pulau terpencil sebagai langkah jangka panjang.</p>',
 'https://placehold.co/800x450/1e3a8a/ffffff?text=Air+Bersih', null, array['air-bersih','kepulauan','program'], true, '2026-03-28T09:00:00.000Z'),

('seed-ak-08', 'Laporan Transparansi Donasi Kuartal I 2026', 'laporan-donasi-kuartal-1-2026', 'aksi-kemanusiaan', 'laporan-donasi',
 'Rincian penerimaan dan penyaluran dana publik secara terbuka dan akuntabel.',
 '<p>BSS Sumenep menerbitkan laporan keuangan kuartal pertama 2026. Total dana yang masuk Rp 142.500.000 telah disalurkan untuk tanggap bencana, bakti sosial, dan program air bersih kepulauan. Laporan lengkap tersedia di website resmi.</p>',
 'https://placehold.co/800x450/312e81/ffffff?text=Laporan+Donasi', null, array['laporan','donasi','transparansi'], true, '2026-03-22T10:00:00.000Z'),

('seed-ak-09', 'Relawan PMI Sumenep Salurkan Bantuan untuk Korban Banjir Pamekasan', 'relawan-pmi-bantuan-banjir-pamekasan', 'aksi-kemanusiaan', 'tanggap-bencana',
 'Tim relawan bergerak cepat mendistribusikan logistik dan layanan kesehatan dasar. Aksi ini bagian dari kesiapsiagaan PMI menghadapi bencana di wilayah Madura.',
 '<p>Tim relawan PMI Sumenep bergerak cepat ke Pamekasan setelah banjir bandang menerjang tiga kecamatan. Sebanyak 30 relawan dikirim membawa 200 paket logistik darurat berisi sembako, air bersih, dan perlengkapan sanitasi untuk warga yang mengungsi.</p><p>Selain distribusi logistik, tim medis PMI turut memberikan layanan kesehatan dasar kepada para pengungsi, terutama anak-anak dan lansia yang rentan mengalami masalah kesehatan pascabanjir seperti diare dan infeksi saluran pernapasan.</p><p>Ketua PMI Sumenep, H. Moh. Saleh, menegaskan bahwa kesiapsiagaan bencana lintas kabupaten merupakan bagian integral dari misi kemanusiaan PMI. "Bencana tidak mengenal batas administrasi. Selama kami mampu, kami akan hadir," tegasnya.</p>',
 'https://placehold.co/600x400/27ae60/ffffff?text=Aksi+Kemanusiaan', 'Humas PMI Sumenep', array['banjir','pamekasan','relawan','tanggap-bencana'], true, '2026-06-03T07:00:00.000Z'),

('seed-ak-10', 'Donor Darah Massal di Alun-Alun Sumenep Kumpulkan 350 Kantong', 'donor-darah-massal-alun-alun-sumenep-350-kantong', 'aksi-kemanusiaan', 'donor-darah',
 'Kegiatan kolaborasi PMI dan komunitas relawan ini melampaui target awal. Antusiasme warga menunjukkan tingginya kesadaran berbagi kehidupan.',
 '<p>Kegiatan donor darah massal yang digelar di Alun-Alun Sumenep berhasil mengumpulkan 350 kantong darah dari berbagai golongan, melampaui target awal 250 kantong. Ratusan warga dari berbagai kalangan antusias hadir sejak pagi hari.</p><p>Kegiatan ini merupakan kolaborasi PMI Sumenep dengan komunitas relawan lokal, OSIS SMA, dan komunitas motor sebagai bagian dari gerakan sadar donor darah yang terus digalakkan.</p><p>"Antusiasme warga Sumenep sangat luar biasa. Ini membuktikan bahwa kepedulian sosial masyarakat kita semakin tinggi," ujar koordinator panitia. Darah yang terkumpul langsung diserahkan ke UDD PMI Sumenep dan didistribusikan ke rumah sakit-rumah sakit yang membutuhkan.</p>',
 'https://placehold.co/600x400/27ae60/ffffff?text=Aksi+Kemanusiaan', 'Redaksi Bulan Sabit', array['donor-darah','massal','alun-alun','sumenep'], true, '2026-05-30T08:00:00.000Z'),

-- DOKTER MENULIS
('seed-dm-01', 'Hipertensi: Si Pembunuh Senyap yang Sering Diabaikan', 'hipertensi-si-pembunuh-senyap', 'dokter-menulis', null,
 'Mengapa tekanan darah tinggi perlu deteksi rutin meski tanpa gejala nyata.',
 '<p>Hipertensi atau tekanan darah tinggi kerap disebut <em>silent killer</em> karena tidak menimbulkan gejala nyata hingga terjadi komplikasi serius seperti stroke atau serangan jantung. Periksa tekanan darah secara rutin setidaknya setiap 6 bulan sekali, terutama bagi yang berusia di atas 40 tahun.</p><p>Gaya hidup sehat — membatasi garam, rutin berolahraga, tidak merokok — adalah kunci utama pencegahan.</p>',
 'https://placehold.co/800x450/1e3a8a/ffffff?text=Hipertensi', 'dr. Ahmad Fauzi, Sp.PD', array['hipertensi','jantung','edukasi-medis'], true, '2026-04-22T10:00:00.000Z'),

('seed-dm-02', 'Memahami Imunisasi Dasar Lengkap pada Anak', 'imunisasi-dasar-lengkap-anak', 'dokter-menulis', null,
 'Jadwal dan manfaat imunisasi yang sering disalahpahami oleh orang tua.',
 '<p>Imunisasi dasar lengkap adalah hak setiap anak yang dijamin negara. Sayangnya, masih banyak orang tua yang menunda atau menolak imunisasi karena mitos yang tidak berdasar ilmu pengetahuan.</p><p>Jadwal imunisasi dimulai dari bayi baru lahir (Hepatitis B), hingga usia 18 bulan (campak-rubela booster). Vaksin aman dan efektif melindungi anak dari penyakit serius.</p>',
 'https://placehold.co/800x450/1d4ed8/ffffff?text=Imunisasi+Anak', 'dr. Siti Aminah, Sp.A', array['imunisasi','anak','vaksin'], true, '2026-04-14T09:00:00.000Z'),

('seed-dm-03', 'Pola Makan Sehat ala Masyarakat Pesisir', 'pola-makan-sehat-pesisir', 'dokter-menulis', null,
 'Memanfaatkan kekayaan laut Madura untuk pola makan bergizi seimbang.',
 '<p>Ikan segar dan hasil laut Madura bukan hanya lezat, tetapi kaya protein, omega-3, dan mineral penting. Konsumsi ikan 3–4 kali seminggu terbukti menurunkan risiko penyakit jantung dan meningkatkan kecerdasan anak.</p><p>Kunci gizi seimbang pesisir: perbanyak sayur, kurangi santan berlebihan, dan ganti nasi putih sebagian dengan umbi-umbian lokal.</p>',
 'https://placehold.co/800x450/0369a1/ffffff?text=Gizi+Pesisir', 'dr. Nurul Hidayah, M.Gizi', array['gizi','pola-makan','pesisir','madura'], true, '2026-04-06T10:00:00.000Z'),

('seed-dm-04', 'Pertolongan Pertama saat Serangan Jantung', 'pertolongan-pertama-serangan-jantung', 'dokter-menulis', null,
 'Langkah kritis menit-menit pertama yang bisa menyelamatkan nyawa.',
 '<p>Serangan jantung adalah kedaruratan medis. Setiap menit keterlambatan meningkatkan risiko kerusakan jantung permanen. Kenali gejalanya: nyeri dada seperti ditekan, sesak napas, keringat dingin, dan mual.</p><p>Langkah pertolongan pertama: hubungi 119, baringkan pasien, longgarkan pakaian, dan lakukan CPR bila pasien tidak sadar dan tidak bernapas. Jangan tunggu gejala "hilang sendiri".</p>',
 'https://placehold.co/800x450/0f172a/ffffff?text=Pertolongan+Pertama', 'dr. Bambang Surya, Sp.JP', array['jantung','pertolongan-pertama','darurat'], true, '2026-03-28T08:00:00.000Z'),

('seed-dm-05', 'Mengapa Donor Darah Aman dan Menyehatkan', 'donor-darah-aman-dan-menyehatkan', 'dokter-menulis', null,
 'Donor darah rutin membantu regenerasi sel darah merah dan menjaga kadar zat besi. Seorang dokter UDD membagikan pandangan medisnya untuk masyarakat awam.',
 '<p>Sebagai dokter yang bertugas di Unit Donor Darah PMI Sumenep, saya sering mendengar kekhawatiran calon pendonor: "Apakah aman? Apakah saya akan kelelahan?" Izinkan saya menjawab dengan fakta medis.</p><p>Donor darah aman dilakukan oleh orang sehat berusia 17–65 tahun, berat badan minimal 45 kg, dan kadar hemoglobin normal. Proses pengambilan darah sebanyak 350–450 mL menggunakan peralatan steril sekali pakai yang menjamin tidak ada risiko penularan penyakit.</p><p>Justru ada manfaat kesehatan yang didapat: donor darah rutin membantu menjaga kadar zat besi agar tidak berlebihan, merangsang sumsum tulang memproduksi sel darah merah baru yang lebih segar, dan sejumlah penelitian menunjukkan manfaat jangka panjang untuk kesehatan kardiovaskular. Jadi, donor darah bukan hanya menolong orang lain — Anda juga menolong diri sendiri.</p>',
 'https://placehold.co/600x400/2980b9/ffffff?text=Dokter+Menulis', 'dr. Ahmad Fauzi, Sp.PD', array['donor-darah','kesehatan','edukasi-medis'], true, '2026-06-01T09:00:00.000Z'),

('seed-dm-06', 'Membongkar Mitos Donor Darah Bikin Lemas', 'mitos-donor-darah-bikin-lemas', 'dokter-menulis', null,
 'Banyak warga ragu mendonor karena takut lemas setelahnya. Tinjauan medis menjelaskan bahwa tubuh memulihkan volume darah dalam hitungan jam.',
 '<p>Mitos bahwa donor darah membuat tubuh lemas adalah salah satu hambatan terbesar yang mencegah banyak orang menjadi pendonor. Sebagai dokter, saya ingin meluruskan kesalahpahaman ini secara ilmiah.</p><p>Tubuh manusia memiliki mekanisme kompensasi yang luar biasa. Setelah donor darah, volume plasma akan dipulihkan dalam 24–48 jam. Sel darah merah baru terbentuk sepenuhnya dalam 4–6 minggu. Rasa lemas sesaat setelah donor biasanya disebabkan oleh kecemasan, bukan kehilangan darah itu sendiri.</p><p>Kunci agar tetap berenergi setelah donor: cukup tidur malam sebelumnya, makan dan minum yang cukup, hindari aktivitas berat dalam 24 jam pertama, dan konsumsi makanan kaya zat besi — daging merah, bayam, kacang-kacangan — dalam beberapa hari berikutnya. Dengan persiapan yang tepat, Anda bisa beraktivitas normal bahkan di hari yang sama.</p>',
 'https://placehold.co/600x400/2980b9/ffffff?text=Dokter+Menulis', 'dr. Siti Rahmawati', array['donor-darah','mitos','edukasi-medis'], true, '2026-05-28T10:00:00.000Z')

on conflict (id) do nothing;

-- ── VIDEO ─────────────────────────────────────────────────────────────────────

insert into videos (id, title, platform, video_id, video_url, thumbnail_url, description, is_published, sort_order) values

('seed-vid-01', 'Pengalaman Pertama Saya Donor Darah', 'youtube', 'dQw4w9WgXcQ',
 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
 'Kisah pertama kali mendonorkan darah di PMI Sumenep — pengalaman yang mengubah pandangan.',
 true, 1),

('seed-vid-02', 'Kenapa Donor Darah Itu Penting?', 'youtube', 'dQw4w9WgXcQ',
 'https://youtu.be/dQw4w9WgXcQ',
 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
 'Edukasi singkat manfaat donor darah bagi pendonor dan penerima.',
 true, 2),

('seed-vid-03', 'Aksi Donor Darah Massal di Sumenep', 'instagram', 'CXXXXXXXXXX',
 'https://www.instagram.com/reel/CXXXXXXXXXX/',
 'https://placehold.co/480x480/e11d48/ffffff?text=Instagram+Reel',
 'Dokumentasi aksi donor darah massal PMI Sumenep.',
 true, 3),

('seed-vid-04', 'Cerita Relawan PMI Sumenep', 'tiktok', '7000000000000000000',
 'https://www.tiktok.com/@pmi.sumenep/video/7000000000000000000',
 'https://placehold.co/480x480/020617/ffffff?text=TikTok',
 'Cerita inspiratif relawan PMI Sumenep dalam bertugas di kepulauan.',
 true, 4)

on conflict (id) do nothing;

-- ── GALERI ────────────────────────────────────────────────────────────────────

insert into galleries (id, title, slug, description, category, cover_url, event_date, is_published, sort_order) values

('seed-gal-01', 'Aksi Donor Darah Maret 2026', 'aksi-donor-darah-maret-2026',
 'Dokumentasi aksi donor darah massal PMI Sumenep, 15 Maret 2026.',
 'donor-darah', 'https://placehold.co/800x600/be123c/ffffff?text=Donor+Darah',
 '2026-03-15', true, 1),

('seed-gal-02', 'Bakti Sosial Guluk-Guluk', 'bakti-sosial-guluk-guluk-2026',
 'Pengobatan gratis dan pembagian sembako di Kecamatan Guluk-Guluk, Februari 2026.',
 'bakti-sosial', 'https://placehold.co/800x600/dc2626/ffffff?text=Bakti+Sosial',
 '2026-02-20', true, 2),

('seed-gal-03', 'Tanggap Bencana Banjir Kalianget', 'tanggap-bencana-banjir-kalianget-2026',
 'Dokumentasi respon cepat tim BSS Sumenep saat banjir rob di Kalianget, Januari 2026.',
 'tanggap-bencana', 'https://placehold.co/800x600/1d4ed8/ffffff?text=Tanggap+Bencana',
 '2026-01-10', true, 3),

('seed-gal-04', 'Kegiatan Posyandu Keliling April 2026', 'kegiatan-posyandu-keliling-april-2026',
 'Layanan posyandu keliling menjangkau balita dan ibu hamil di pulau-pulau terpencil.',
 'kegiatan', 'https://placehold.co/800x600/16a34a/ffffff?text=Posyandu+Keliling',
 '2026-04-05', true, 4)

on conflict (id) do nothing;

-- ── FOTO GALERI ───────────────────────────────────────────────────────────────

insert into gallery_photos (id, gallery_id, image_url, caption, sort_order) values

-- Galeri 01: Donor Darah Maret 2026
('seed-ph-0101', 'seed-gal-01', 'https://placehold.co/800x600/be123c/ffffff?text=Antrian+Pendonor', 'Antrian pendonor pagi hari di halaman Kantor PMI', 1),
('seed-ph-0102', 'seed-gal-01', 'https://placehold.co/800x600/9f1239/ffffff?text=Pemeriksaan+Darah', 'Petugas PMI memeriksa golongan darah pendonor', 2),
('seed-ph-0103', 'seed-gal-01', 'https://placehold.co/800x600/881337/ffffff?text=Pengambilan+Darah', 'Proses pengambilan darah berlangsung tertib', 3),
('seed-ph-0104', 'seed-gal-01', 'https://placehold.co/800x600/7f1d1d/ffffff?text=Pasca+Donor', 'Pendonor menerima snack dan sertifikat pasca-donor', 4),

-- Galeri 02: Bakti Sosial Guluk-Guluk
('seed-ph-0201', 'seed-gal-02', 'https://placehold.co/800x600/dc2626/ffffff?text=Pembukaan', 'Pembukaan bakti sosial oleh ketua BSS Sumenep', 1),
('seed-ph-0202', 'seed-gal-02', 'https://placehold.co/800x600/b91c1c/ffffff?text=Pemeriksaan', 'Pemeriksaan kesehatan gratis oleh tim dokter', 2),
('seed-ph-0203', 'seed-gal-02', 'https://placehold.co/800x600/991b1b/ffffff?text=Pembagian+Obat', 'Pembagian obat kepada warga', 3),
('seed-ph-0204', 'seed-gal-02', 'https://placehold.co/800x600/7f1d1d/ffffff?text=Distribusi+Sembako', 'Distribusi sembako untuk keluarga kurang mampu', 4),

-- Galeri 03: Tanggap Bencana Banjir Kalianget
('seed-ph-0301', 'seed-gal-03', 'https://placehold.co/800x600/1d4ed8/ffffff?text=Kondisi+Banjir', 'Kondisi banjir rob yang merendam jalan pesisir Kalianget', 1),
('seed-ph-0302', 'seed-gal-03', 'https://placehold.co/800x600/1e40af/ffffff?text=Tim+Evakuasi', 'Tim evakuasi BSS bergerak menggunakan perahu karet', 2),
('seed-ph-0303', 'seed-gal-03', 'https://placehold.co/800x600/1e3a8a/ffffff?text=Distribusi+Logistik', 'Distribusi logistik bantuan kepada warga terdampak', 3),
('seed-ph-0304', 'seed-gal-03', 'https://placehold.co/800x600/172554/ffffff?text=Warga+Menerima', 'Warga terdampak menerima bantuan sembako darurat', 4),

-- Galeri 04: Posyandu Keliling April 2026
('seed-ph-0401', 'seed-gal-04', 'https://placehold.co/800x600/16a34a/ffffff?text=Tiba+di+Pulau', 'Tim posyandu tiba di Pulau Kangean pagi hari', 1),
('seed-ph-0402', 'seed-gal-04', 'https://placehold.co/800x600/15803d/ffffff?text=Penimbangan+Balita', 'Penimbangan dan pengukuran tinggi badan balita', 2),
('seed-ph-0403', 'seed-gal-04', 'https://placehold.co/800x600/166534/ffffff?text=Ibu+Hamil', 'Pemeriksaan ibu hamil trimester ketiga', 3),
('seed-ph-0404', 'seed-gal-04', 'https://placehold.co/800x600/14532d/ffffff?text=Imunisasi', 'Pemberian vitamin A dan imunisasi campak', 4)

on conflict (id) do nothing;
