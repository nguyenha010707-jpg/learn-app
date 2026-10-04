/**
 * DỮ LIỆU ÔN TẬP MẠNG MÁY TÍNH
 * Tổng hợp toàn diện từ các tài liệu bài giảng:
 * - Chuyên đề 0/1: Chương 1 - Tổng quan Internet, Mô hình OSI & TCP/IP (Nạp từ Chap 1 - Internet vs OSI.pptx)
 * - Chuyên đề 2: Tầng Physical, Cáp xoắn đôi (UTP/STP), Cáp quang (SMF/MMF), Chuẩn kết nối & Phụ kiện
 * - Chuyên đề 3: Tầng Data Link, Địa chỉ MAC, Khung Ethernet II, Cơ chế Switch & CSMA/CD
 * - Chuyên đề 4: Giao thức ARP, Default Gateway, Wi-Fi & DHCP, Định tuyến đa chặng (Hop-by-hop vs End-to-end)
 * - Chuyên đề mở rộng: Tùy chỉnh (Bạn có thể thêm tiếp bất kỳ câu hỏi nào)
 */

const INITIAL_TOPICS = [
  { id: 'all', name: '🎯 Tất cả chuyên đề (Tổng hợp)', desc: 'Ôn tập toàn diện toàn bộ bài giảng' },
  { id: 'chap1', name: '🌐 Chương 1: Internet & Mô hình OSI / TCP/IP', desc: 'Khái niệm Internet, 7 tầng OSI, 4 tầng TCP/IP, Đóng gói Encapsulation, Hub/Switch/Router' },
  { id: 'phy', name: '⚡ Chương 2.1: Tầng Physical & Cáp truyền dẫn', desc: 'Cáp đồng, Cáp quang, RJ45, ODF, SFP, Media Converter...' },
  { id: 'datalink', name: '🔄 Chương 2.2: Data Link Layer & Ethernet Switch', desc: 'Khung Ethernet, Địa chỉ MAC, Bảng CAM, CSMA/CD, Collision Domain...' },
  { id: 'arp', name: '🚀 Chương 2.3: Giao thức ARP & Định tuyến mạng', desc: 'ARP Request/Reply, Default Gateway, Wi-Fi, DHCP, Luồng gói ICMP qua Router...' },
  { id: 'chap4', name: '🖧 Chương 4: Tầng Network — IPv4 & Subnetting ✨MỚI', desc: 'IPv4 cấu trúc, Private/Public, NAT, Classful/CIDR, Subnetting, VLSM, Block Size, bài tập tính toán subnet' },
  { id: 'custom', name: '📂 Chuyên đề mở rộng (Tự thêm)', desc: 'Nơi lưu trữ các câu hỏi bạn tự thêm vào hệ thống' }
];

const INITIAL_QUIZ_DATA = [
  // ==========================================
  // CHƯƠNG 1: INTERNET & MÔ HÌNH OSI / TCP/IP (TỪ PPTX FILE 4)
  // ==========================================
  {
    id: 'c1-1',
    topic: 'chap1',
    question: 'Khái niệm "Internet" được định nghĩa chính xác nhất là gì trong bài học?',
    options: [
      'Là một mạng máy tính cục bộ kết nối các máy tính trong cùng một văn phòng',
      'Là một nhóm các network liên kết với nhau ("network of networks"), giúp các máy tính truyền nhận dữ liệu từ xa dù không cùng mạng cục bộ',
      'Là hệ thống cáp ngầm dưới biển chỉ dành riêng cho quân sự',
      'Là một phần mềm duyệt web được cài đặt trên hệ điều hành'
    ],
    correct: 1,
    explanation: 'Theo Slide Chap 1: Network là nhóm các máy tính liên kết với nhau; còn Internet là một nhóm các network liên kết với nhau ("network of network"), cho phép các máy tính ở xa liên lạc được với nhau dù không cùng mạng cục bộ.'
  },
  {
    id: 'c1-2',
    topic: 'chap1',
    question: 'Hai khái niệm cốt lõi đóng vai trò nền tảng cho cách thức hoạt động của Internet là gì?',
    options: [
      'Cáp đồng và cáp quang',
      'Địa chỉ MAC và Card mạng NIC',
      'Gói dữ liệu (Packet) và Giao thức (Protocol)',
      'Trình duyệt Web và Máy chủ DNS'
    ],
    correct: 2,
    explanation: 'Slide 7 nêu rõ: Có hai khái niệm chính là nền tảng cho cách thức hoạt động của Internet là gói dữ liệu (Packet) và giao thức (Protocol).'
  },
  {
    id: 'c1-3',
    topic: 'chap1',
    question: 'Trong cấu trúc gói dữ liệu (Packet), phần thông tin nằm ở đầu giúp thiết bị nhận biết phải làm gì với gói tin được gọi là gì?',
    options: [
      'Payload (Dữ liệu thực)',
      'Tiêu đề (Header)',
      'Trailer (Đuôi gói tin)',
      'Checksum (Mã kiểm tra)'
    ],
    correct: 1,
    explanation: 'Slide 8: Thông tin về nội dung của gói dữ liệu được gọi là "tiêu đề" (Header) và nó nằm ở đầu để máy nhận biết phải làm gì với gói dữ liệu đó.'
  },
  {
    id: 'c1-4',
    topic: 'chap1',
    question: 'Giao thức nào chịu trách nhiệm truyền tải đảm bảo đúng thứ tự (tin cậy), và giao thức nào tối ưu cho truyền tải tốc độ cao như video trực tuyến?',
    options: [
      'TCP đảm bảo đúng thứ tự; UDP tối ưu cho tốc độ cao (video)',
      'UDP đảm bảo đúng thứ tự; TCP tối ưu cho tốc độ cao',
      'HTTP đảm bảo đúng thứ tự; IP tối ưu cho video',
      'Ethernet đảm bảo đúng thứ tự; ARP tối ưu cho video'
    ],
    correct: 0,
    explanation: 'Slide 11: TCP đảm bảo truyền tải tin cậy đúng thứ tự, trong khi UDP tối ưu cho truyền tải tốc độ cao (như phát video trực tuyến, streaming, game).'
  },
  {
    id: 'c1-5',
    topic: 'chap1',
    question: 'Việc thiết kế kiến trúc mạng theo các phân lớp (Layers) mang lại 3 ưu điểm vượt trội nào?',
    options: [
      'Tăng giá thành thiết bị, tăng kích thước cáp, bảo mật tuyệt đối',
      'Giảm độ phức tạp, Chuẩn hóa quy trình (đa nhà sản xuất), Khắc phục sự cố hiệu quả (cô lập từng tầng)',
      'Bỏ qua sự cần thiết của địa chỉ IP, loại bỏ hoàn toàn mã hóa, tự động tăng băng thông',
      'Chỉ hoạt động được với hệ điều hành Windows'
    ],
    correct: 1,
    explanation: 'Slide 13 nêu 3 ưu điểm cốt lõi của kiến trúc phân lớp: 1. Giảm độ phức tạp; 2. Chuẩn hóa quy trình (cho phép thiết bị của nhiều hãng tương thích); 3. Khắc phục sự cố hiệu quả (cô lập và kiểm tra lỗi ở từng phân lớp).'
  },
  {
    id: 'c1-6',
    topic: 'chap1',
    question: 'Thứ tự 7 tầng trong mô hình OSI từ Layer 1 (dưới cùng) đến Layer 7 (trên cùng) là gì?',
    options: [
      'Application -> Presentation -> Session -> Transport -> Network -> Data Link -> Physical',
      'Physical -> Data Link -> Network -> Transport -> Session -> Presentation -> Application',
      'Physical -> Network -> Data Link -> Transport -> Session -> Application -> Presentation',
      'Network Access -> Internet -> Transport -> Application'
    ],
    correct: 1,
    explanation: 'Thứ tự chuẩn từ tầng 1 đến tầng 7 của OSI: Layer 1: Physical -> Layer 2: Data Link -> Layer 3: Network -> Layer 4: Transport -> Layer 5: Session -> Layer 6: Presentation -> Layer 7: Application.'
  },
  {
    id: 'c1-7',
    topic: 'chap1',
    question: 'Tầng nào trong mô hình OSI giao tiếp trực tiếp với người dùng và hỗ trợ các giao thức quen thuộc như HTTP, HTTPS, DNS, SMTP, FTP?',
    options: [
      'Session Layer (Tầng phiên)',
      'Presentation Layer (Tầng trình bày)',
      'Application Layer (Tầng ứng dụng - Layer 7)',
      'Transport Layer (Tầng vận chuyển)'
    ],
    correct: 2,
    explanation: 'Slide 15: Tầng Ứng dụng (Application Layer - Layer 7) giao tiếp trực tiếp với người dùng, tạo dữ liệu gửi đi và hiển thị thông tin nhận được với các giao thức HTTP, HTTPS, DNS, SMTP, FTP.'
  },
  {
    id: 'c1-8',
    topic: 'chap1',
    question: 'Tầng Presentation (Tầng trình bày - Layer 6) trong mô hình OSI thực hiện 3 nhiệm vụ chính nào?',
    options: [
      'Định địa chỉ IP, định tuyến gói tin, giảm TTL',
      'Định dạng (Formatting - JSON/XML), Mã hóa (Encryption - SSL/TLS), và Nén dữ liệu (Compression)',
      'Quản lý đóng mở cổng phiên làm việc, chèn checkpoint đồng bộ',
      'Chuyển đổi tín hiệu thành xung điện và phát ra cáp đồng'
    ],
    correct: 1,
    explanation: 'Slide 16 nêu rõ 3 nhiệm vụ của Presentation Layer: 1. Định dạng (Formatting sang JSON, XML); 2. Mã hóa (Encryption như SSL/TLS); 3. Nén dữ liệu (Compression).'
  },
  {
    id: 'c1-9',
    topic: 'chap1',
    question: 'Tầng Session (Tầng phiên - Layer 5) đóng vai trò chính là gì trong mô hình OSI?',
    options: [
      'Đóng gói dữ liệu thành khung Ethernet mang địa chỉ MAC',
      'Đóng vai trò là "trình quản lý hội thoại", điều chỉnh việc thiết lập, duy trì, đồng bộ hóa (checkpoints) và giải phóng các kênh liên lạc giữa hai thiết bị',
      'Đảm bảo dây cáp không bị đứt trong lúc truyền',
      'Chuyển đổi tên miền thành địa chỉ IP'
    ],
    correct: 1,
    explanation: 'Slide 17: Session Layer đóng vai trò "trình quản lý hội thoại", điều chỉnh việc mở, đóng và bảo mật các kênh liên lạc; chèn các mốc kiểm soát (checkpoints) để tiếp tục truyền nếu mất mạng.'
  },
  {
    id: 'c1-10',
    topic: 'chap1',
    question: 'Tầng Transport (Tầng vận chuyển - Layer 4) thực hiện các chức năng cốt lõi nào?',
    options: [
      'Bấm đầu mạng RJ45 và nối dây nhảy quang',
      'Truyền tải thông điệp end-to-end: Phân đoạn (Segmentation) & Tái hợp, Kiểm soát luồng (Flow Control) và Kiểm soát lỗi (Error Control)',
      'Chỉ gửi dữ liệu trên cùng một phân đoạn mạng cục bộ LAN',
      'Chuyển địa chỉ MAC thành địa chỉ IP'
    ],
    correct: 1,
    explanation: 'Slide 18: Tầng Transport (Layer 4) đảm bảo truyền tải end-to-end từ đầu đến cuối, gồm: 1. Phân đoạn & Tái hợp; 2. Kiểm soát luồng (điều tiết tốc độ truyền phù hợp máy nhận); 3. Kiểm soát lỗi.'
  },
  {
    id: 'c1-11',
    topic: 'chap1',
    question: 'Mô hình TCP/IP gồm có 4 tầng, tương ứng theo thứ tự từ trên xuống dưới là:',
    options: [
      'Application -> Transport -> Internet -> Network Access (Link)',
      'Application -> Presentation -> Session -> Transport',
      'Application -> Internet -> Data Link -> Physical',
      'Web -> TCP -> IP -> Cáp'
    ],
    correct: 0,
    explanation: 'Slide 22: Mô hình TCP/IP gồm 4 tầng: 1. Application (HTTP, SMTP, DNS); 2. Transport (TCP, UDP); 3. Internet (IP); 4. Network Access / Link (Ethernet, WiFi).'
  },
  {
    id: 'c1-12',
    topic: 'chap1',
    question: 'Trong quá trình đóng gói dữ liệu (Encapsulation), đơn vị dữ liệu (PDU) tại các tầng Application, Transport, Network, Data Link và Physical lần lượt là:',
    options: [
      'Bits -> Frames -> Packets -> Segments -> Data',
      'Data -> Segment -> Packet -> Frame -> Bits',
      'Data -> Packet -> Segment -> Frame -> Bits',
      'Frame -> Packet -> Segment -> Data -> Bits'
    ],
    correct: 1,
    explanation: 'Slide 23: Quá trình Encapsulation đi từ trên xuống: Application (Data) -> Transport (Segment) -> Network (Packet) -> Data Link (Frame) -> Physical (Bits).'
  },
  {
    id: 'c1-13',
    topic: 'chap1',
    question: 'Thiết bị HUB hoạt động ở tầng nào của mô hình OSI và có đặc điểm phân phối dữ liệu như thế nào?',
    options: [
      'Hoạt động ở Layer 2; chỉ gửi frame đến máy có MAC khớp',
      'Hoạt động ở Layer 1 (Physical); khi nhận dữ liệu sẽ phát tràn ra tất cả các cổng còn lại, gây ra nhiều xung đột (collision)',
      'Hoạt động ở Layer 3; định tuyến thông minh dựa trên địa chỉ IP',
      'Hoạt động ở Layer 7; lọc trang web độc hại'
    ],
    correct: 1,
    explanation: 'Slide 25: HUB hoạt động ở Layer 1 (Physical), cơ chế đơn giản là phát tín hiệu nhận được ra tất cả các cổng còn lại, tạo ra 1 collision domain lớn và gây nhiều xung đột dữ liệu.'
  },
  {
    id: 'c1-14',
    topic: 'chap1',
    question: 'So với Hub, thiết bị Switch hoạt động ở tầng nào và tối ưu hiệu năng truyền tải bằng cơ chế gì?',
    options: [
      'Hoạt động ở Layer 2 (Data Link); học địa chỉ MAC để chuyển tiếp chính xác đến cổng máy đích, chia nhỏ các collision domain',
      'Hoạt động ở Layer 1; chuyển đổi tín hiệu quang sang điện',
      'Hoạt động ở Layer 4; kiểm tra cổng TCP/UDP',
      'Hoạt động ở Layer 3; chia sẻ băng thông chung cho tất cả các cổng'
    ],
    correct: 0,
    explanation: 'Slide 26: Switch hoạt động ở Layer 2, học địa chỉ MAC để chuyển tiếp chính xác đến cổng của thiết bị đích, mỗi cổng là một collision domain riêng biệt giúp giảm thiểu xung đột.'
  },
  {
    id: 'c1-15',
    topic: 'chap1',
    question: 'Thiết bị Router hoạt động ở tầng nào và có vai trò cốt lõi gì trong mạng máy tính?',
    options: [
      'Hoạt động ở Layer 1; làm cổng chia dây cáp mạng',
      'Hoạt động ở Layer 2; phân giải địa chỉ MAC thành địa chỉ vật lý',
      'Hoạt động ở Layer 3 (Network); kết nối các mạng khác nhau (như LAN với Internet) và định tuyến gói tin dựa trên địa chỉ IP',
      'Hoạt động ở Layer 7; chạy dịch vụ Web Server'
    ],
    correct: 2,
    explanation: 'Slide 27: Router hoạt động ở Layer 3 (Network), có chức năng kết nối các mạng khác biệt (ví dụ LAN với Internet) và định tuyến các gói tin dựa trên địa chỉ IP.'
  },
  {
    id: 'c1-16',
    topic: 'chap1',
    question: 'Hai công cụ (tools) tiêu chuẩn được giảng viên giới thiệu ở cuối Chương 1 để thực hành mô phỏng và bắt phân tích gói tin mạng là:',
    options: [
      'Postman và Docker',
      'Cisco Packet Tracer và Wireshark',
      'Photoshop và Visual Studio Code',
      'VMware và VirtualBox'
    ],
    correct: 1,
    explanation: 'Slide 29: Hai công cụ thực hành chính của môn học là Cisco Packet Tracer (mô phỏng mạng) và Wireshark (phân tích bắt gói tin mạng thực tế).'
  },

  // ==========================================
  // CHƯƠNG 2.1: PHYSICAL LAYER & CÁP
  // ==========================================
  {
    id: 'phy-1',
    topic: 'phy',
    question: 'Tầng Physical (Tầng Vật lý) trong mô hình mạng chịu trách nhiệm chính về điều gì?',
    options: [
      'Định tuyến gói tin IP qua các mạng khác nhau',
      'Tiếp nhận luồng bit logic (0 và 1) từ Data Link và mã hóa thành tín hiệu vật lý',
      'Đóng gói dữ liệu thành các Frame và kiểm tra mã lỗi CRC',
      'Thiết lập phiên làm việc và bảo mật SSL/TLS'
    ],
    correct: 1,
    explanation: 'Tầng Physical chịu trách nhiệm tiếp nhận các luồng bit logic (0 và 1) từ tầng Data Link và mã hóa chúng thành các tín hiệu vật lý (xung điện áp, ánh sáng hoặc sóng vô tuyến).'
  },
  {
    id: 'phy-2',
    topic: 'phy',
    question: 'Trong mạng cáp đồng Ethernet chuẩn 10 Mbps, kỹ thuật mã hóa nào được sử dụng để truyền tín hiệu với tốc độ 20 triệu trạng thái mỗi giây?',
    options: [
      'Mã hóa NRZ (Non-Return-to-Zero)',
      'Mã hóa 4B/5B',
      'Mã hóa Manchester',
      'Mã hóa PAM-5'
    ],
    correct: 2,
    explanation: 'Theo bài học, chuẩn 10 Mbps Ethernet sử dụng kỹ thuật mã hóa Manchester để đồng bộ hóa tín hiệu với tốc độ 20 triệu trạng thái mỗi giây.'
  },
  {
    id: 'phy-3',
    topic: 'phy',
    question: 'Để hiểu rõ quá trình truyền tải dữ liệu, cần phân biệt Bit, Tín hiệu (Signal) và Đường truyền (Medium). Định nghĩa nào sau đây là đúng về Tín hiệu (Signal)?',
    options: [
      'Đơn vị dữ liệu logic cơ bản nhất (0 và 1)',
      'Môi trường vật lý dẫn truyền (cáp đồng, cáp quang, không gian)',
      'Sự biến thiên của điện áp hoặc ánh sáng dùng để đại diện cho các bit trên thực tế',
      'Đơn vị dữ liệu đóng gói ở tầng Data Link mang địa chỉ MAC'
    ],
    correct: 2,
    explanation: 'Bit là đơn vị logic cơ bản (0 và 1); Tín hiệu là sự biến thiên của điện áp hoặc ánh sáng đại diện cho các bit; Đường truyền là môi trường vật lý dẫn truyền.'
  },
  {
    id: 'phy-4',
    topic: 'phy',
    question: 'Nguyên lý vật lý của cấu trúc xoắn đôi (Twisted Pair) trong cáp mạng có tác dụng cốt lõi nào?',
    options: [
      'Tăng chiều dài cáp lên trên 1000m mà không cần bộ khuếch đại',
      'Triệt tiêu nhiễu điện từ (EMI) từ môi trường bên ngoài và giảm thiểu nhiễu chéo (crosstalk)',
      'Làm cho dây cáp mềm dẻo hơn để uốn cong dễ dàng',
      'Tăng điện áp truyền dẫn trên từng cặp dây đồng'
    ],
    correct: 1,
    explanation: 'Cấu trúc xoắn các cặp dây lại với nhau giúp triệt tiêu nhiễu điện từ (EMI) từ bên ngoài và giảm thiểu hiện tượng nhiễu chéo (crosstalk) giữa các cặp dây liền kề.'
  },
  {
    id: 'phy-5',
    topic: 'phy',
    question: 'Sự khác biệt quan trọng nhất giữa cáp STP (Shielded Twisted Pair) và UTP (Unshielded Twisted Pair) là gì?',
    options: [
      'UTP sử dụng dây nhôm, còn STP sử dụng dây đồng nguyên chất',
      'STP có thêm lớp bọc lá kim loại hoặc lưới bện chống nhiễu điện từ mạnh, phù hợp cho nhà máy công nghiệp',
      'UTP có thể truyền xa hơn 500m, trong khi STP chỉ truyền được 50m',
      'STP sử dụng đầu nối 12 chân, còn UTP sử dụng đầu nối 8 chân'
    ],
    correct: 1,
    explanation: 'STP có thêm lớp lá kim loại hoặc lưới bện xung quanh các cặp dây giúp chống nhiễu điện từ (EMI) tốt hơn trong môi trường phức tạp (nhà máy, đi gần dây điện nguồn), trong khi UTP không có lớp bọc kim loại này nhưng rẻ và mềm dẻo hơn.'
  },
  {
    id: 'phy-6',
    topic: 'phy',
    question: 'Chuẩn cáp đồng nào hỗ trợ tốc độ 10 Gbps trên toàn bộ khoảng cách 100 mét với băng thông lên tới 500 MHz?',
    options: [
      'Cat5e',
      'Cat6',
      'Cat6A',
      'Cat5'
    ],
    correct: 2,
    explanation: 'Cat5e: tối đa 1 Gbps, 100 MHz. Cat6: 1 Gbps (10 Gbps chỉ đạt ở khoảng cách ngắn < 55m), 250 MHz. Cat6A: hỗ trợ chuẩn 10 Gbps trên toàn bộ 100m, băng thông 500 MHz.'
  },
  {
    id: 'phy-7',
    topic: 'phy',
    question: 'Đầu nối RJ45 (8P8C) tiêu chuẩn cho mạng Ethernet có bao nhiêu chân tiếp xúc đồng và giới hạn khoảng cách vật lý tối đa là bao nhiêu?',
    options: [
      '4 chân tiếp xúc, tối đa 50 mét',
      '8 chân tiếp xúc, tối đa 100 mét',
      '8 chân tiếp xúc, tối đa 500 mét',
      '6 chân tiếp xúc, tối đa 100 mét'
    ],
    correct: 1,
    explanation: 'RJ45 (8P8C - 8 Position 8 Contact) có 8 chân tiếp xúc đồng, kết nối 4 cặp dây xoắn, và bị giới hạn khoảng cách vật lý tối đa là 100m trước khi tín hiệu suy hao quá mức.'
  },
  {
    id: 'phy-8',
    topic: 'phy',
    question: 'Ánh sáng truyền qua lõi sợi cáp quang (Core) tuân theo hiện tượng vật lý nào?',
    options: [
      'Hiện tượng khúc xạ toàn phần ra ngoài lớp vỏ',
      'Hiện tượng phản xạ toàn phần (Total Internal Reflection)',
      'Hiện tượng cộng hưởng từ trường điện môi',
      'Hiện tượng tán xạ Rayleigh'
    ],
    correct: 1,
    explanation: 'Lõi (Core) bằng thủy tinh được bao quanh bởi lớp bọc (Cladding) có chỉ số khúc xạ thấp hơn, ánh sáng được giữ lại bên trong lõi nhờ hiện tượng phản xạ toàn phần.'
  },
  {
    id: 'phy-9',
    topic: 'phy',
    question: 'Đặc điểm nào sau đây là của cáp quang Single-Mode (SMF) so với Multi-Mode (MMF)?',
    options: [
      'Lõi lớn (50-62.5 µm), dùng nguồn phát LED giá rẻ, cự ly ngắn < 2 km',
      'Lõi nhỏ (8-10 µm), chỉ cho 1 tia sáng truyền qua, nguồn Laser đắt tiền, truyền xa hàng chục km không bị tán sắc chế độ',
      'Bị suy hao tín hiệu rất nhanh do hiện tượng tán sắc chế độ (Modal Dispersion)',
      'Chỉ được sử dụng trong mạng nội bộ văn phòng (LAN)'
    ],
    correct: 1,
    explanation: 'Single-mode (SMF) có lõi rất nhỏ (8-10 µm), dùng nguồn sáng Laser, chỉ truyền 1 mode sóng nên không bị tán sắc chế độ, truyền đi cự ly rất xa (hàng chục km cho WAN, viễn thông).'
  },
  {
    id: 'phy-10',
    topic: 'phy',
    question: 'Các chuẩn đầu nối cáp quang phổ biến gồm LC, SC, ST, FC. Loại đầu nối nào nhỏ gọn nhất, có chốt bấm Push-Pull và thường dùng trong mô-đun SFP ở Data Center?',
    options: [
      'SC (Subscriber Connector - đầu vuông tiêu chuẩn)',
      'ST (Straight Tip - đầu tròn gài khớp bayonet)',
      'LC (Lucent Connector - dạng nhỏ gọn cắm SFP)',
      'FC (Ferrule Connector - đầu tròn ren xoắn)'
    ],
    correct: 2,
    explanation: 'LC (Lucent Connector) có kích thước nhỏ gọn, cơ chế push-pull, tối ưu mật độ cổng cao trong Data Center và cắm vào mô-đun quang SFP/SFP+.'
  },
  {
    id: 'phy-11',
    topic: 'phy',
    question: 'Thiết bị nào có chức năng chính là chuyển đổi tín hiệu giữa cáp đồng RJ45 và cáp quang để mở rộng cự ly truyền từ 100m lên hàng chục kilômét?',
    options: [
      'Hộp phối quang (ODF)',
      'Bảng cắm cáp (Patch Panel)',
      'Bộ chuyển đổi quang điện (Media Converter)',
      'Dây nối quang (Pigtail)'
    ],
    correct: 2,
    explanation: 'Media Converter là thiết bị chuyển đổi tín hiệu giữa 2 môi trường truyền dẫn (cáp đồng RJ45 và cáp quang), mở rộng khoảng cách kết nối lên hàng chục km.'
  },
  {
    id: 'phy-12',
    topic: 'phy',
    question: 'Hộp phối quang (ODF - Optical Distribution Frame) có vai trò chính là gì trong hệ thống mạng quang?',
    options: [
      'Chuyển đổi tín hiệu xung điện thành ánh sáng',
      'Quản lý, bảo vệ các mối hàn quang và phân phối kết nối cáp quang đến thiết bị truyền dẫn',
      'Cấp phát địa chỉ IP tự động cho các thiết bị mạng',
      'Tự động tăng công suất phát của tia Laser'
    ],
    correct: 1,
    explanation: 'ODF chứa khay hàn quang (Splice Tray) để bảo vệ mối hàn giữa cáp với dây pigtail, và các adapter để cắm nối dây nhảy quang (Patch cord) tập trung.'
  },
  {
    id: 'phy-13',
    topic: 'phy',
    question: 'Tại sao trong các phòng server/Data Center lại lắp đặt Patch Panel (Bảng cắm cáp) giữa cáp đi từ các phòng và Switch?',
    options: [
      'Để tăng tốc độ truyền mạng từ 1 Gbps lên 10 Gbps',
      'Bảo vệ cổng Switch khỏi nguy cơ hỏng hóc do cắm/rút thường xuyên, đồng thời giúp dán nhãn quản lý gọn gàng',
      'Tự động mã hóa dữ liệu theo chuẩn AES-256',
      'Thay thế hoàn toàn chức năng của Router'
    ],
    correct: 1,
    explanation: 'Patch Panel gom các đầu cáp cố định, giúp thao tác cắm nhảy thuận tiện, bảo vệ các cổng Switch đắt tiền khỏi bị cong chân hay lỏng do cắm rút liên tục.'
  },

  // ==========================================
  // CHƯƠNG 2.2: DATA LINK LAYER & SWITCH
  // ==========================================
  {
    id: 'dl-1',
    topic: 'datalink',
    question: 'Đơn vị dữ liệu (PDU) tại Tầng Data Link (Tầng 2 trong mô hình OSI) được gọi là gì?',
    options: [
      'Packet (Gói tin)',
      'Segment (Đoạn dữ liệu)',
      'Frame (Khung dữ liệu)',
      'Bit'
    ],
    correct: 2,
    explanation: 'Tại tầng Data Link (Layer 2), đơn vị dữ liệu được đóng gói thành Frame. (Layer 4 là Segment, Layer 3 là Packet, Layer 1 là Bit).'
  },
  {
    id: 'dl-2',
    topic: 'datalink',
    question: 'Địa chỉ MAC (Media Access Control) có độ dài bao nhiêu bit và được biểu diễn bằng hệ cơ số nào?',
    options: [
      '32 bit, hệ thập phân (Dotted Decimal)',
      '48 bit (6 Bytes), hệ thập lục phân (Hexadecimal)',
      '64 bit (8 Bytes), hệ nhị phân (Binary)',
      '128 bit (16 Bytes), hệ thập lục phân'
    ],
    correct: 1,
    explanation: 'Địa chỉ MAC có chiều dài 48 bit (tương đương 6 byte), được ghi cứng vào ROM của card mạng (NIC) và biểu diễn bằng 12 ký tự thập lục phân (ví dụ 00:1A:2B:3C:4D:5E).'
  },
  {
    id: 'dl-3',
    topic: 'datalink',
    question: 'Sự khác nhau cơ bản nhất về bản chất giữa địa chỉ IP và địa chỉ MAC là gì?',
    options: [
      'Địa chỉ MAC xác định vị trí logic trên toàn cầu; Địa chỉ IP gắn liền cố định với phần cứng NIC',
      'Địa chỉ IP dùng để xác định vị trí thiết bị trong liên mạng; Địa chỉ MAC định danh bản thân thiết bị phần cứng để giao vận cục bộ (Layer 2)',
      'Địa chỉ MAC có thể tự do thay đổi bằng DHCP; Địa chỉ IP không bao giờ thay đổi',
      'Địa chỉ IP hoạt động ở Layer 2; Địa chỉ MAC hoạt động ở Layer 3'
    ],
    correct: 1,
    explanation: 'Địa chỉ IP giống như "Địa chỉ nhà" (thay đổi theo vị trí mạng), dùng để định tuyến toàn cục. Địa chỉ MAC giống như "Số CCCD" (duy nhất của phần cứng), dùng để giao vận cục bộ tại Layer 2.'
  },
  {
    id: 'dl-4',
    topic: 'datalink',
    question: 'Cấu trúc Ethernet II Frame (IEEE 802.3) gồm những trường thông tin chính nào theo thứ tự?',
    options: [
      'Source MAC (6B) -> Dest MAC (6B) -> Payload -> FCS',
      'Dest MAC (6B) -> Source MAC (6B) -> EtherType (2B) -> Payload (46-1500B) -> FCS (4B)',
      'Preamble -> IP Header -> Dest MAC -> Payload -> Checksum',
      'Port Nguồn -> Port Đích -> Payload -> Sequence Number'
    ],
    correct: 1,
    explanation: 'Khung Ethernet II chuẩn gồm: Dest MAC (6B), Source MAC (6B), EtherType (2B), Payload (46 - 1500B) và FCS (Frame Check Sequence 4B dùng CRC).'
  },
  {
    id: 'dl-5',
    topic: 'datalink',
    question: 'Trường EtherType có kích thước 2 Bytes. Giá trị 0x0800 và 0x0806 lần lượt chỉ định giao thức tầng trên nào?',
    options: [
      '0x0800 chỉ định IPv6, 0x0806 chỉ định ICMP',
      '0x0800 chỉ định IPv4, 0x0806 chỉ định ARP',
      '0x0800 chỉ định TCP, 0x0806 chỉ định UDP',
      '0x0800 chỉ định ARP, 0x0806 chỉ định IPv4'
    ],
    correct: 1,
    explanation: 'Theo slide: 0x0800 -> IPv4 (Internet Protocol v4), 0x0806 -> ARP (Address Resolution Protocol), 0x86DD -> IPv6.'
  },
  {
    id: 'dl-6',
    topic: 'datalink',
    question: 'Trong cơ chế CSMA/CD của mạng Ethernet cổ điển, khi phát hiện va chạm tín hiệu (Collision Detected), thiết bị truyền sẽ lập tức làm gì?',
    options: [
      'Tăng công suất phát để đè bẹp tín hiệu của máy kia',
      'Gửi tín hiệu gây nghẽn (Jamming Signal), hủy truyền, tính thời gian chờ ngẫu nhiên (Exponential Backoff) rồi thử lại',
      'Khởi động lại toàn bộ Switch và Card mạng',
      'Gửi gói tin ICMP thông báo lỗi cho Router'
    ],
    correct: 1,
    explanation: 'Khi phát hiện xung đột, thiết bị sẽ phát tín hiệu Jam Signal để thông báo cho toàn mạng, dừng truyền, thực hiện giải thuật Exponential Backoff để chờ một khoảng thời gian ngẫu nhiên trước khi thử gửi lại.'
  },
  {
    id: 'dl-7',
    topic: 'datalink',
    question: 'So sánh giữa chế độ Half-Duplex (Bán song công) và Full-Duplex (Song công toàn phần):',
    options: [
      'Half-Duplex truyền đồng thời 2 chiều; Full-Duplex chỉ truyền 1 chiều luân phiên',
      'Half-Duplex giống như máy bộ đàm (chỉ 1 bên truyền tại 1 thời điểm); Full-Duplex giống cuộc gọi điện thoại (gửi và nhận độc lập đồng thời, không xảy ra xung đột)',
      'Half-Duplex sử dụng trên Switch hiện đại; Full-Duplex chỉ dùng trên thiết bị Hub cũ',
      'Cả hai đều có nguy cơ va chạm gói tin như nhau'
    ],
    correct: 1,
    explanation: 'Half-duplex: 1 chiều tại 1 thời điểm (như bộ đàm, Hub). Full-duplex: 2 chiều đồng thời trên các kênh vật lý riêng (như điện thoại, Switch), hoàn toàn không có xung đột (collision-free).'
  },
  {
    id: 'dl-8',
    topic: 'datalink',
    question: 'Một Hub 8 cổng kết nối với 5 máy tính tạo thành bao nhiêu Collision Domain? Trong khi một Switch 8 cổng kết nối 5 máy tính tạo thành bao nhiêu Collision Domain?',
    options: [
      'Hub: 5 domain; Switch: 1 domain',
      'Hub: 1 domain; Switch: 5 domain riêng biệt (mỗi cổng là 1 domain)',
      'Hub: 8 domain; Switch: 8 domain',
      'Hub: 0 domain; Switch: 1 domain'
    ],
    correct: 1,
    explanation: 'Hub chia sẻ chung một môi trường truyền nên toàn bộ các cổng tạo thành 1 Collision Domain duy nhất. Switch tách biệt môi trường truyền ở từng cổng nên MỖI CỔNG là một Collision Domain độc lập.'
  },
  {
    id: 'dl-9',
    topic: 'datalink',
    question: 'Quy tắc vàng (Golden Rule) trong cơ chế học địa chỉ của Switch (Switch Learning) là gì?',
    options: [
      'Switch học từ địa chỉ Destination MAC của Frame nhận vào',
      'Switch CHỈ học từ địa chỉ Source MAC của Frame đi vào cổng, KHÔNG BAO GIỜ học từ Destination MAC',
      'Switch học địa chỉ IP của thiết bị từ DHCP Server',
      'Switch gửi câu hỏi ARP định kỳ để cập nhật bảng MAC'
    ],
    correct: 1,
    explanation: 'Quy tắc cốt lõi: Switch CHỈ học bằng cách đọc trường Source MAC của khung dữ liệu đi vào port để ánh xạ vào cổng đó. Switch tuyệt đối KHÔNG học từ Destination MAC.'
  },
  {
    id: 'dl-10',
    topic: 'datalink',
    question: 'Khi Switch nhận được một frame mà địa chỉ Destination MAC chưa hề có trong bảng MAC (Unknown Unicast), Switch sẽ làm gì?',
    options: [
      'Drop (hủy bỏ) frame ngay lập tức',
      'Gửi trả frame ngược lại cổng gửi',
      'Thực hiện Flooding: Gửi frame ra tất cả các cổng còn lại (ngoại trừ cổng nhận vào)',
      'Lưu frame vào hàng đợi và đợi máy đích gửi tin nhắn trước'
    ],
    correct: 2,
    explanation: 'Với Unknown Unicast (hoặc Broadcast), Switch sẽ flood (phát tràn) frame đó ra toàn bộ các port khác trừ chính port nhận vào (ingress port).'
  },
  {
    id: 'dl-11',
    topic: 'datalink',
    question: 'Hành vi Filtering (Lọc/hủy frame) của Switch xảy ra trong tình huống nào?',
    options: [
      'Khi frame có kích thước vượt quá 1500 bytes',
      'Khi cổng đích tra trong bảng MAC trùng khớp với chính cổng nhận frame vào',
      'Khi địa chỉ Destination MAC là FF:FF:FF:FF:FF:FF',
      'Khi không kết nối được tới Router'
    ],
    correct: 1,
    explanation: 'Filtering xảy ra khi địa chỉ nguồn và địa chỉ đích của frame đều nằm trên cùng một nhánh cổng. Switch sẽ drop frame để tránh lặp vòng lưu lượng không cần thiết.'
  },
  {
    id: 'dl-12',
    topic: 'datalink',
    question: 'Địa chỉ MAC Broadcast chuẩn trong Ethernet là địa chỉ nào?',
    options: [
      '00:00:00:00:00:00',
      '255.255.255.255',
      'FF:FF:FF:FF:FF:FF',
      'FF:00:FF:00:FF:00'
    ],
    correct: 2,
    explanation: 'Địa chỉ MAC Broadcast chuẩn ở Layer 2 là FF:FF:FF:FF:FF:FF (tất cả 48 bit đều là 1).'
  },
  {
    id: 'dl-13',
    topic: 'datalink',
    question: 'Sự khác biệt giữa Dynamic MAC và Static MAC trên Switch Cisco là gì?',
    options: [
      'Dynamic MAC do admin gán cố định; Static MAC tự học qua lưu lượng',
      'Dynamic MAC tự học, có thời gian sống (Aging Time mặc định 300s) và mất khi reboot; Static MAC do admin cấu hình thủ công, không bị xóa theo thời gian, dùng cho bảo mật',
      'Static MAC chỉ dùng cho cáp quang; Dynamic MAC chỉ dùng cho cáp đồng',
      'Không có sự khác biệt về cách lưu trữ trong bộ nhớ'
    ],
    correct: 1,
    explanation: 'Dynamic MAC được Switch học tự động, có Aging Time (300 giây mặc định) và bị xóa khỏi RAM khi reboot. Static MAC do quản trị viên cấu hình gán cứng vào cổng, không hết hạn, lưu vào startup-config, ứng dụng cho Port Security.'
  },

  // ==========================================
  // CHƯƠNG 2.3: ARP, DEFAULT GATEWAY & ROUTING
  // ==========================================
  {
    id: 'arp-1',
    topic: 'arp',
    question: 'Mục đích cốt lõi của giao thức ARP (Address Resolution Protocol) là gì?',
    options: [
      'Chuyển đổi tên miền (Domain Name) thành địa chỉ IP',
      'Ánh xạ từ địa chỉ logic IPv4 sang địa chỉ vật lý MAC tương ứng trong cùng phân đoạn mạng LAN',
      'Cấp phát địa chỉ IP tự động cho máy tính khi mới khởi động',
      'Kiểm tra tốc độ đường truyền và độ trễ gói tin'
    ],
    correct: 1,
    explanation: 'ARP giúp tìm kiếm địa chỉ MAC tương ứng với một địa chỉ IP đã biết trong cùng mạng nội bộ, giúp hoàn tất quá trình đóng gói Ethernet Frame ở Tầng 2.'
  },
  {
    id: 'arp-2',
    topic: 'arp',
    question: 'Thông điệp ARP Request và ARP Reply được gửi đi dưới hình thức truyền thông nào?',
    options: [
      'Cả hai đều gửi dưới hình thức Unicast',
      'Cả hai đều gửi dưới hình thức Broadcast',
      'ARP Request gửi Broadcast (FF:FF:FF:FF:FF:FF); ARP Reply gửi Unicast trực tiếp về MAC của máy yêu cầu',
      'ARP Request gửi Multicast; ARP Reply gửi Broadcast'
    ],
    correct: 2,
    explanation: 'ARP Request là câu hỏi cho toàn mạng ("Ai có IP này?") nên phải gửi Broadcast. Máy đích nhận ra IP của mình sẽ gửi ARP Reply đích danh trực tiếp bằng Unicast về MAC của máy hỏi.'
  },
  {
    id: 'arp-3',
    topic: 'arp',
    question: 'Trên máy tính Windows, lệnh nào dùng để xem bảng nhớ đệm ARP Cache và lệnh nào dùng để xóa sạch bộ đệm ARP?',
    options: [
      'Xem: ipconfig /all; Xóa: ipconfig /release',
      'Xem: arp -a; Xóa: arp -d *',
      'Xem: netstat -r; Xóa: route delete 0.0.0.0',
      'Xem: ping -t; Xóa: cls'
    ],
    correct: 1,
    explanation: 'Theo bài giảng, trên Windows: dùng lệnh "arp -a" để hiển thị ARP Cache và "arp -d *" để xóa toàn bộ các entry động trong cache.'
  },
  {
    id: 'arp-4',
    topic: 'arp',
    question: 'Khi PC A (192.168.1.10) muốn gửi gói tin cho PC B (192.168.2.20 - nằm ở Subnet khác), PC A sẽ gửi gói ARP Request để tìm địa chỉ MAC của ai?',
    options: [
      'Tìm địa chỉ MAC của PC B (192.168.2.20)',
      'Tìm địa chỉ MAC của Default Gateway (Router 192.168.1.1)',
      'Tìm địa chỉ MAC của DNS Server (8.8.8.8)',
      'Không cần gửi ARP vì khác mạng thì không dùng địa chỉ MAC'
    ],
    correct: 1,
    explanation: 'LƯU Ý RẤT QUAN TRỌNG: Khi hai máy khác subnet, máy nguồn KHÔNG gửi ARP tìm MAC của máy đích! Nó sẽ gửi ARP tìm MAC của Default Gateway (Router cục bộ) để chuyển frame tới Router.'
  },
  {
    id: 'arp-5',
    topic: 'arp',
    question: 'Default Gateway đóng vai trò gì trong kiến trúc mạng máy tính?',
    options: [
      'Là máy chủ lưu trữ toàn bộ trang web trên Internet',
      'Là thiết bị cửa ngõ (thường là Router) tiếp nhận và chuyển tiếp mọi lưu lượng cần ra ngoài phân đoạn mạng nội bộ (Subnet local)',
      'Là cổng phần cứng trên máy tính để cắm cáp mạng RJ45',
      'Là phần mềm tường lửa ngăn chặn virus trên máy tính'
    ],
    correct: 1,
    explanation: 'Default Gateway là địa chỉ của Router đóng vai trò cửa ngõ ra vào. Khi máy tính muốn truyền dữ liệu đến một địa chỉ ngoài mạng local, nó bắt buộc phải chuyển frame tới Default Gateway.'
  },
  {
    id: 'arp-6',
    topic: 'arp',
    question: 'Quy trình cấp phát IP tự động qua giao thức DHCP gồm 4 bước theo đúng thứ tự nào sau đây?',
    options: [
      'DHCP Request -> DHCP Offer -> DHCP Discover -> DHCP ACK',
      'DHCP Discover -> DHCP Offer -> DHCP Request -> DHCP ACK (D-O-R-A)',
      'DHCP Hello -> DHCP Accept -> DHCP Config -> DHCP Finish',
      'DHCP Probe -> DHCP Association -> DHCP Handshake -> DHCP Ready'
    ],
    correct: 1,
    explanation: 'Quá trình DHCP kinh điển viết tắt là D-O-R-A: 1. Discover (Client broadcast tìm server) -> 2. Offer (Server gợi ý IP) -> 3. Request (Client xác nhận chọn IP) -> 4. ACK (Server chốt cấu hình cấp cho Client).'
  },
  {
    id: 'arp-7',
    topic: 'arp',
    question: 'Gói tin DHCP ACK trả về cho máy tính client thường chứa những thông số cốt lõi nào?',
    options: [
      'Chỉ duy nhất địa chỉ MAC của Router',
      'IPv4 cá nhân, Subnet Mask, Default Gateway và DNS Server',
      'Tài khoản và mật khẩu đăng nhập Windows',
      'Danh sách các địa chỉ website bị chặn'
    ],
    correct: 1,
    explanation: 'Gói DHCP ACK hoàn tất cấu hình mạng cho Client với 4 thông số cốt lõi: Địa chỉ IP của máy, Subnet Mask, Default Gateway (IP Router) và DNS Server.'
  },
  {
    id: 'arp-8',
    topic: 'arp',
    question: 'Khi một gói tin IP di chuyển xuyên qua nhiều Router trên Internet (từ máy gửi A đến máy nhận B ở xa), điều gì xảy ra với địa chỉ IP và địa chỉ MAC?',
    options: [
      'Cả IP và MAC đều giữ nguyên vẹn từ đầu đến cuối',
      'IP nguồn và IP đích thay đổi liên tục qua từng Router; MAC giữ nguyên',
      'IP nguồn và IP đích được BẢO TỒN NGUYÊN VẸN suốt hành trình; Địa chỉ MAC bị bóc tách và thay đổi ở mỗi chặng kết nối (Hop-by-Hop)',
      'Cả địa chỉ IP và MAC đều bị xóa và thay thế bằng số ngẫu nhiên'
    ],
    correct: 2,
    explanation: 'Nguyên lý cốt lõi: Gói tin Layer 3 (IP Packet) giữ nguyên IP nguồn và IP đích suốt hành trình. Trong khi đó, Ethernet Frame Layer 2 bị Router bóc bỏ header cũ, tra bảng định tuyến, giảm TTL và đóng gói Frame mới với MAC nguồn và MAC đích mới tương ứng với chặng kế tiếp (Hop-by-Hop).'
  },
  {
    id: 'arp-9',
    topic: 'arp',
    question: 'Mỗi khi một Router nhận được gói tin IP và chuyển tiếp sang chặng tiếp theo, giá trị trường nào trong IP Header bắt buộc bị giảm đi 1 đơn vị để tránh lặp vô tận (Routing Loop)?',
    options: [
      'Version',
      'Protocol',
      'TTL (Time to Live)',
      'Checksum'
    ],
    correct: 2,
    explanation: 'Theo sơ đồ slide quy trình đa chặng: Router nhận tín hiệu, bóc Ethernet Header, GIẢM GIÁ TRỊ TTL ĐI 1 ĐƠN VỊ (TTL - 1), tra cứu bảng định tuyến rồi đóng gói frame mới. Khi TTL = 0, gói tin sẽ bị hủy.'
  },
  {
    id: 'arp-10',
    topic: 'arp',
    question: 'Trong quy trình kết nối Wi-Fi trước khi thực hiện xin IP từ DHCP, thiết bị cần trải qua giai đoạn bắt tay bảo mật nào để thiết lập khóa mã hóa PTK?',
    options: [
      'TCP 3-way Handshake (SYN, SYN-ACK, ACK)',
      'WPA2 / WPA3 4-way Handshake',
      'SSL/TLS Client Hello',
      'CSMA/CD Jamming Handshake'
    ],
    correct: 1,
    explanation: 'Theo sơ đồ kết nối Wi-Fi: Giai đoạn 1 gồm Quét SSID (Probe Request/Response) -> Xác thực Open Authentication -> Bắt tay bảo mật (WPA2/WPA3 4-way Handshake) để trao đổi Nonce và tạo khóa mã hóa PTK.'
  }
];

const INITIAL_ESSAY_DATA = [
  // ==========================================
  // TỰ LUẬN CHƯƠNG 1 (MỚI NẠP TỪ PPTX)
  // ==========================================
  {
    id: 'es-c1-1',
    topic: 'chap1',
    title: 'So sánh mô hình 7 tầng OSI và mô hình 4 tầng TCP/IP',
    question: 'Hãy so sánh chi tiết giữa Mô hình tham chiếu 7 tầng OSI và Mô hình 4 tầng TCP/IP. Chỉ ra các tầng tương ứng của TCP/IP gộp từ những tầng nào trong OSI, kèm theo các giao thức tiêu biểu ở mỗi tầng.',
    suggestedAnswer: `1. Tổng quan kiến trúc:
- Mô hình OSI (Open Systems Interconnection): Gồm 7 tầng lý thuyết độc lập nhằm chuẩn hóa truyền thông mạng.
- Mô hình TCP/IP: Gồm 4 tầng thực tế, được sử dụng làm nền tảng cho Internet ngày nay.

2. Bảng ánh xạ tương ứng giữa 2 mô hình:
- Tầng 1 TCP/IP (Network Access / Link Layer):
  + Tương ứng với Tầng 1 (Physical) và Tầng 2 (Data Link) của OSI.
  + Giao thức & Phần cứng tiêu biểu: Ethernet (IEEE 802.3), Wi-Fi (802.11), cáp mạng, MAC address.
- Tầng 2 TCP/IP (Internet Layer):
  + Tương ứng với Tầng 3 (Network Layer) của OSI.
  + Chức năng: Định địa chỉ logic và định tuyến gói tin (Routing).
  + Giao thức tiêu biểu: IP (IPv4, IPv6), ICMP, ARP, OSPF, BGP.
- Tầng 3 TCP/IP (Transport Layer):
  + Tương ứng trực tiếp với Tầng 4 (Transport Layer) của OSI.
  + Chức năng: Vận chuyển dữ liệu đầu cuối (End-to-End), kiểm soát luồng và lỗi.
  + Giao thức tiêu biểu: TCP (tin cậy, hướng kết nối) và UDP (tốc độ cao, phi kết nối).
- Tầng 4 TCP/IP (Application Layer):
  + Gộp cả 3 tầng trên cùng của OSI: Tầng 5 (Session) + Tầng 6 (Presentation) + Tầng 7 (Application).
  + Chức năng: Xử lý định dạng dữ liệu (JSON/XML), mã hóa (SSL/TLS), quản lý phiên và giao tiếp người dùng.
  + Giao thức tiêu biểu: HTTP, HTTPS, DNS, SMTP, FTP, SSH, Telnet.`,
    keywords: ['osi', 'tcp/ip', '7 tầng', '4 tầng', 'network access', 'internet', 'transport', 'application', 'physical', 'data link', 'network', 'presentation', 'session', 'tcp', 'udp', 'ip', 'http']
  },
  {
    id: 'es-c1-2',
    topic: 'chap1',
    title: 'Phân tích quá trình Đóng gói (Encapsulation) & Bóc tách (De-encapsulation)',
    question: 'Trình bày chi tiết quá trình Đóng gói (Encapsulation) từ tầng Application xuống Physical và quá trình Bóc tách (De-encapsulation) ngược lại. Nêu rõ tên gọi Đơn vị dữ liệu giao thức (PDU) và thông tin tiêu đề (Header) được thêm vào tại mỗi tầng.',
    suggestedAnswer: `1. Quá trình Đóng gói dữ liệu (Encapsulation) tại bên gửi:
Dữ liệu di chuyển từ tầng cao nhất (Application) xuống tầng thấp nhất (Physical), tại mỗi tầng sẽ được bổ sung thêm thông tin điều khiển (Header/Trailer):
- Bước 1 (Tầng Application): Người dùng tạo thông điệp dữ liệu ban đầu -> PDU gọi là DATA (Dữ liệu).
- Bước 2 (Tầng Transport): Dữ liệu được chia nhỏ thành các phân đoạn, thêm Transport Header (chứa Source Port, Destination Port, Sequence Number) -> PDU gọi là SEGMENT.
- Bước 3 (Tầng Network): Segment được thêm IP Header (chứa Source IP, Destination IP, TTL, Protocol) -> PDU gọi là PACKET (Gói tin).
- Bước 4 (Tầng Data Link): Packet được bọc thêm Ethernet Header ở đầu (Source MAC, Destination MAC, EtherType) và FCS Trailer ở cuối (mã kiểm tra lỗi CRC) -> PDU gọi là FRAME (Khung dữ liệu).
- Bước 5 (Tầng Physical): Frame hoàn chỉnh được chuyển đổi thành các chuỗi BITS logic (0 và 1) và mã hóa thành tín hiệu vật lý (xung điện áp, ánh sáng, sóng vô tuyến) để truyền ra môi trường dẫn truyền.

2. Quá trình Bóc tách dữ liệu (De-encapsulation) tại bên nhận:
- Diễn ra theo chiều ngược lại từ dưới lên: Physical (thu nhận Bits) -> Data Link (kiểm tra lỗi FCS, bóc Ethernet Header lấy Packet) -> Network (kiểm tra Destination IP, bóc IP Header lấy Segment) -> Transport (kiểm tra Port, tái hợp các Segment thành Data) -> Application (xử lý và hiển thị thông điệp cho người dùng).`,
    keywords: ['encapsulation', 'de-encapsulation', 'đóng gói', 'bóc tách', 'data', 'segment', 'packet', 'frame', 'bits', 'port', 'source ip', 'dest ip', 'source mac', 'dest mac', 'fcs', 'header']
  },
  {
    id: 'es-c1-3',
    topic: 'chap1',
    title: 'So sánh cơ chế hoạt động của HUB, SWITCH và ROUTER',
    question: 'Hãy so sánh sự khác biệt cơ bản giữa 3 thiết bị mạng quan trọng: HUB, SWITCH và ROUTER về: tầng hoạt động trong mô hình OSI, cơ chế chuyển tiếp dữ liệu, địa chỉ sử dụng để xử lý và khả năng quản lý miền va chạm (Collision Domain).',
    suggestedAnswer: `1. Thiết bị HUB:
- Tầng hoạt động: Tầng 1 - Physical Layer.
- Cơ chế chuyển tiếp: Thiết bị thụ động ("ngu ngơ"), khi nhận tín hiệu từ một cổng sẽ khuếch đại và phát tràn (broadcast/flood) ra TẤT CẢ các cổng còn lại.
- Địa chỉ nhận diện: Không quan tâm địa chỉ MAC hay IP.
- Quản lý Collision Domain: Toàn bộ Hub chỉ là 1 Collision Domain duy nhất -> Dễ xảy ra xung đột dữ liệu khi nhiều máy cùng truyền (Half-duplex).

2. Thiết bị SWITCH (Bộ chuyển mạch):
- Tầng hoạt động: Tầng 2 - Data Link Layer.
- Cơ chế chuyển tiếp: Thông minh, tự học địa chỉ Source MAC để xây dựng bảng CAM. Khi nhận Frame, tra Destination MAC để chuyển tiếp chính xác đến cổng của thiết bị đích.
- Địa chỉ nhận diện: Địa chỉ vật lý MAC Address (48 bit).
- Quản lý Collision Domain: MỖI CỔNG LÀ MỘT COLLISION DOMAIN ĐỘC LẬP -> Triệt tiêu xung đột dữ liệu, hỗ trợ Full-Duplex. (Tuy nhiên toàn Switch vẫn là 1 Broadcast Domain).

3. Thiết bị ROUTER (Bộ định tuyến):
- Tầng hoạt động: Tầng 3 - Network Layer.
- Cơ chế chuyển tiếp: Định tuyến thông minh giữa các mạng khác nhau (như mạng LAN nội bộ với Internet). Đọc địa chỉ IP đích và tra cứu Bảng định tuyến (Routing Table) để tìm đường đi tối ưu.
- Địa chỉ nhận diện: Địa chỉ logic IP Address (IPv4 / IPv6).
- Quản lý Domain: Chia cắt cả Collision Domain và chia cắt cả BROADCAST DOMAIN (chặn gói tin Broadcast không cho tràn sang mạng khác).`,
    keywords: ['hub', 'switch', 'router', 'layer 1', 'layer 2', 'layer 3', 'physical', 'data link', 'network', 'mac', 'ip', 'collision domain', 'broadcast domain', 'bảng cam', 'routing table', 'phát tràn']
  },
  {
    id: 'es-c1-4',
    topic: 'chap1',
    title: 'Phân tích vai trò của Tầng Trình bày (Presentation) và Tầng Phiên (Session)',
    question: 'Giải thích tại sao mô hình OSI lại tách biệt Tầng Presentation (Layer 6) và Tầng Session (Layer 5) khỏi Tầng Application. Nêu ví dụ cụ thể về hoạt động của Formatting, Encryption, Compression (ở Layer 6) và Checkpoints (ở Layer 5).',
    suggestedAnswer: `1. Lý do tách biệt:
Trong mô hình OSI lý thuyết, các nhà thiết kế muốn chuẩn hóa sâu sắc từng khâu độc lập để lập trình viên ứng dụng không phải tự xây dựng lại cơ chế mã hóa, nén hay kiểm soát phiên từ đầu.

2. Tầng Presentation (Layer 6) - "Người phiên dịch và bảo vệ dữ liệu":
- Formatting (Định dạng): Đảm bảo các hệ thống máy tính có kiến trúc khác nhau (Little Endian vs Big Endian, Windows vs Linux) đều hiểu được cấu trúc dữ liệu, ví dụ chuyển đổi sang chuẩn JSON hoặc XML.
- Encryption (Mã hóa & Giải mã): Bảo mật luồng dữ liệu trước khi gửi và giải mã khi nhận, ví dụ giao thức SSL/TLS trong HTTPS.
- Compression (Nén dữ liệu): Thu nhỏ dung lượng gói tin (như nén Gzip) để truyền qua mạng nhanh hơn và tiết kiệm băng thông.

3. Tầng Session (Layer 5) - "Trình quản lý hội thoại":
- Thiết lập, duy trì và đóng phiên kết nối logic giữa 2 ứng dụng.
- Đồng bộ hóa qua Checkpoints (Mốc kiểm soát): Nếu đang tải tệp dung lượng 1GB mà mất kết nối ở 600MB, nhờ có checkpoint được đánh dấu ở tầng Session, thiết bị chỉ cần tiếp tục truyền từ 600MB trở đi chứ không phải truyền lại từ đầu.`,
    keywords: ['presentation', 'session', 'layer 6', 'layer 5', 'formatting', 'encryption', 'compression', 'checkpoints', 'mốc kiểm soát', 'json', 'xml', 'ssl/tls', 'quản lý hội thoại']
  },

  // ==========================================
  // TỰ LUẬN CHƯƠNG 2 (TỪ CÁC SLIDE TRƯỚC)
  // ==========================================
  {
    id: 'es-1',
    topic: 'phy',
    title: 'So sánh cáp quang Single-Mode (SMF) và Multi-Mode (MMF)',
    question: 'Hãy so sánh chi tiết giữa cáp quang Single-Mode (SMF) và Multi-Mode (MMF) về: kích thước lõi, nguồn phát sáng, hiện tượng tán sắc chế độ (Modal Dispersion), khoảng cách truyền tải tối đa và phạm vi ứng dụng thực tế.',
    suggestedAnswer: `1. Kích thước lõi (Core):
- Single-Mode (SMF): Lõi siêu nhỏ (8 - 10 µm), chỉ cho phép 1 tia sáng (mode) truyền qua.
- Multi-Mode (MMF): Lõi lớn hơn nhiều (50 - 62.5 µm), cho phép nhiều tia sáng truyền qua đồng thời theo nhiều góc phản xạ.

2. Nguồn sáng & Chi phí:
- SMF: Sử dụng nguồn phát Laser công suất lớn, độ chính xác cao, chi phí đắt.
- MMF: Sử dụng đèn LED hoặc VCSEL giá rẻ, tiết kiệm chi phí thiết bị quang.

3. Tán sắc chế độ & Băng thông:
- SMF: Không bị hiện tượng tán sắc chế độ (Modal Dispersion), băng thông cực cao, suy hao thấp.
- MMF: Tán sắc chế độ cao do các tia sáng truyền theo nhiều đường khác nhau đến đích không cùng lúc, làm biến dạng tín hiệu ở cự ly xa.

4. Khoảng cách & Ứng dụng:
- SMF: Khoảng cách rất xa (hàng chục km đến 80km+), dùng cho mạng WAN viễn thông, liên tỉnh, cáp quang biển, kết nối giữa các Data Center (Inter-Data Center).
- MMF: Khoảng cách ngắn (thường < 2km, tối ưu < 550m), dùng cho mạng nội bộ LAN, kết nối Server-Switch trong cùng trung tâm dữ liệu (Intra-Data Center).`,
    keywords: ['single-mode', 'multi-mode', 'lõi', '8-10', '50-62.5', 'laser', 'led', 'tán sắc chế độ', 'modal dispersion', 'khoảng cách', 'wan', 'lan', 'data center']
  },
  {
    id: 'es-2',
    topic: 'datalink',
    title: 'Cơ chế học địa chỉ MAC và 3 hành vi cốt lõi của Switch',
    question: 'Trình bày quy tắc vàng khi Switch học địa chỉ MAC. Sau khi học, khi nhận được một khung dữ liệu (Ethernet Frame), Switch có thể thực hiện 3 hành vi xử lý nào? Nêu rõ điều kiện kích hoạt từng hành vi.',
    suggestedAnswer: `1. Quy tắc vàng của Switch (Switch Learning):
Switch CHỈ học địa chỉ MAC từ trường SOURCE MAC (MAC nguồn) của Frame nhận vào một cổng (Ingress port) để lưu vào bảng MAC (CAM Table). Switch TUYỆT ĐỐI KHÔNG BAO GIỜ học từ Destination MAC.

2. Ba hành vi cốt lõi của Switch:
- Hành vi 1: Chuyển tiếp (FORWARD)
  + Điều kiện: Địa chỉ Destination MAC của frame đã có trong bảng MAC (Known Unicast) và cổng đích khác cổng nhận vào.
  + Hành động: Switch đẩy frame chính xác ra duy nhất một cổng đã xác định.

- Hành vi 2: Lọc bỏ (FILTER / DROP)
  + Điều kiện: Địa chỉ Destination MAC và Source MAC cùng thuộc về một cổng (cùng nằm trên một nhánh switch/hub).
  + Hành động: Switch hủy bỏ frame, không đẩy ngược lại cổng đó để tránh lặp vòng lưu lượng.

- Hành vi 3: Phát tràn (FLOOD)
  + Điều kiện: Khi địa chỉ Destination MAC chưa có trong bảng MAC (Unknown Unicast) HOẶC là địa chỉ Broadcast (FF:FF:FF:FF:FF:FF).
  + Hành động: Switch nhân bản và gửi frame ra tất cả các cổng hoạt động ngoại trừ chính cổng đã nhận frame vào.`,
    keywords: ['source mac', 'destination mac', 'không học', 'cam table', 'forward', 'filter', 'flood', 'bảng mac', 'unknown unicast', 'broadcast', 'ngoại trừ cổng gửi']
  },
  {
    id: 'es-3',
    topic: 'arp',
    title: 'Phân tích quá trình truyền gói tin Ping giữa 2 máy khác Subnet',
    question: 'Giả sử PC A (192.168.1.10) thực hiện lệnh `ping 192.168.2.20` (PC B nằm ở mạng khác qua Router Default Gateway 192.168.1.1). Hãy mô tả chi tiết: PC A có gửi ARP tìm MAC của PC B không? PC A sẽ làm gì? Vai trò của Default Gateway trong kịch bản này là gì?',
    suggestedAnswer: `1. Kiểm tra lớp mạng (Layer 3 Subnet):
Khi PC A chuẩn bị gửi gói tin, nó kiểm tra IP đích (192.168.2.20) và nhận thấy IP đích nằm ở một Subnet khác so với dải mạng cục bộ của mình (192.168.1.0/24).

2. Quy tắc ARP khi khác Subnet:
PC A TUYỆT ĐỐI KHÔNG gửi ARP Request để tìm địa chỉ MAC của PC B (192.168.2.20), vì bản tin Broadcast ARP không thể vượt qua Router.

3. Hành động thực tế của PC A:
- PC A nhận thấy gói tin cần đi ra ngoài mạng cục bộ, nên nó sẽ chuyển gói tin tới Default Gateway (IP: 192.168.1.1).
- PC A kiểm tra ARP Cache tìm MAC của Default Gateway. Nếu chưa có, PC A gửi ARP Request Broadcast: "Who has 192.168.1.1? Tell 192.168.1.10".
- Sau khi nhận được MAC của Default Gateway, PC A đóng gói Ethernet Frame:
  + Source IP: 192.168.1.10, Destination IP: 192.168.2.20 (GIỮ NGUYÊN)
  + Source MAC: MAC_PC_A, Destination MAC: MAC của Default Gateway (Router).

4. Vai trò của Default Gateway:
Router đóng vai trò cửa ngõ định tuyến. Router nhận Frame, bóc Ethernet Header, kiểm tra bảng định tuyến, giảm TTL đi 1 đơn vị, sau đó dùng ARP để tìm MAC của PC B (hoặc Router chặng kế tiếp), đóng gói lại Ethernet Frame mới và chuyển tiếp đến đích.`,
    keywords: ['khác subnet', 'không gửi arp tìm pc b', 'default gateway', 'router', 'arp request', '192.168.1.1', 'ip nguồn giữ nguyên', 'ip đích giữ nguyên', 'mac đích là gateway', 'ttl-1', 'bóc tách']
  },
  {
    id: 'es-4',
    topic: 'phy',
    title: 'Cấu tạo cáp xoắn đôi và sự khác biệt giữa Cat5e, Cat6 và Cat6A',
    question: 'Giải thích tại sao cáp mạng xoắn đôi lại có các cặp dây xoắn vào nhau. So sánh các tiêu chuẩn cáp Cat5e, Cat6 và Cat6A về tốc độ tối đa, băng thông và cự ly truyền dẫn 10 Gbps.',
    suggestedAnswer: `1. Tác dụng của cấu trúc xoắn đôi (Twisted Pair):
Các cặp dây đồng được xoắn lại với nhau theo bước xoắn tính toán chính xác để:
- Triệt tiêu nhiễu điện từ (EMI) từ môi trường bên ngoài: Điện từ trường cảm ứng trên hai dây triệt tiêu lẫn nhau.
- Giảm thiểu hiện tượng nhiễu xuyên âm (Crosstalk) giữa các cặp dây liền kề bên trong cùng một sợi cáp.
Nhờ đó cáp duy trì được tín hiệu ổn định ở tốc độ cao trên khoảng cách tiêu chuẩn 100m.

2. So sánh Cat5e, Cat6 và Cat6A:
- Cat5e:
  + Tốc độ tối đa: 1 Gbps (Gigabit Ethernet)
  + Băng thông: 100 MHz
  + Không hỗ trợ chuẩn 10 Gbps ở cự ly thông thường.
- Cat6:
  + Tốc độ: 1 Gbps ổn định trên 100m; hỗ trợ 10 Gbps ở khoảng cách ngắn (dưới 55 mét).
  + Băng thông: 250 MHz.
  + Thường có thêm lõi nhựa chữ thập (spline) để cách ly 4 cặp dây.
- Cat6A (Augmented):
  + Tốc độ: Đạt chuẩn 10 Gbps trên TOÀN BỘ khoảng cách 100 mét.
  + Băng thông vượt trội: 500 MHz.
  + Tiêu chuẩn vàng cho Data Center hiện đại và hạ tầng mạng hiệu năng cao.`,
    keywords: ['triệt tiêu nhiễu', 'emi', 'crosstalk', 'nhiễu chéo', 'cat5e', 'cat6', 'cat6a', '1 gbps', '10 gbps', '100 mhz', '250 mhz', '500 mhz', '55 mét', '100 mét', 'lõi chữ thập']
  },
  {
    id: 'es-5',
    topic: 'datalink',
    title: 'Giải thuật CSMA/CD và so sánh Collision Domain giữa Hub và Switch',
    question: 'Trình bày các bước hoạt động của giải thuật CSMA/CD. Phân tích tại sao khi thay thế Hub bằng Switch thì hiện tượng va chạm (Collision) trong mạng Ethernet gần như bị triệt tiêu hoàn toàn?',
    suggestedAnswer: `1. Giải thuật CSMA/CD (Carrier Sense Multiple Access with Collision Detection):
- Bước 1 (Carrier Sense - Nghe): Thiết bị lắng nghe đường truyền. Nếu đường truyền bận thì chờ; nếu rảnh thì mới phát dữ liệu.
- Bước 2 (Multiple Access - Đa truy nhập): Nhiều thiết bị cùng có quyền truy nhập và gửi tin trên môi trường chia sẻ.
- Bước 3 (Collision Detection - Phát hiện va chạm): Trong khi truyền, card mạng tiếp tục theo dõi điện áp trên đường truyền.
- Xử lý khi va chạm:
  + Nếu phát hiện tín hiệu va chạm: Thiết bị lập tức gửi tín hiệu Jamming Signal để cảnh báo toàn bộ các trạm khác.
  + Ngừng phát dữ liệu ngay lập tức.
  + Thực hiện thuật toán ngẫu nhiên Exponential Backoff để tính thời gian chờ.
  + Sau thời gian chờ, quay lại Bước 1 để thử gửi lại (tối đa một số lần retry nhất định).

2. Tại sao Switch triệt tiêu Collision so với Hub:
- Thiết bị Hub hoạt động ở Layer 1, nối chung tất cả các cổng vào một đường truyền vật lý (Shared Medium) -> Toàn bộ Hub chỉ là 1 Collision Domain duy nhất. Bất kỳ 2 máy nào truyền cùng lúc đều gây va chạm (Half-duplex).
- Switch hoạt động ở Layer 2, có bộ nhớ đệm (buffer) và chuyển mạch riêng cho từng cổng. MỖI CỔNG CỦA SWITCH LÀ MỘT COLLISION DOMAIN ĐỘC LẬP.
- Khi kết hợp với chế độ Full-Duplex (có kênh truyền nhận riêng biệt trên từng cổng), không có sự tranh chấp đường truyền, loại bỏ hoàn toàn khả năng xảy ra va chạm (Collision-free).`,
    keywords: ['csma/cd', 'carrier sense', 'nghe đường truyền', 'jamming signal', 'exponential backoff', 'hub', 'switch', 'collision domain', 'mỗi cổng là một collision domain', 'full-duplex', 'shared medium']
  },
  {
    id: 'es-6',
    topic: 'arp',
    title: 'Nguyên lý bảo tồn IP và biến đổi MAC qua các chặng Router (Hop-by-Hop)',
    question: 'Giải thích nguyên lý "Bảo tồn dữ liệu Lớp 3 (IP) và Thay đổi dữ liệu Lớp 2 (MAC)" khi gói tin truyền qua nhiều Router trên Internet. Router thực hiện những thao tác gì với gói tin tại mỗi chặng?',
    suggestedAnswer: `1. Nguyên lý cốt lõi:
- Lớp 3 (Network Layer - IP Packet): Mang tính định tuyến toàn cục (End-to-End). Do đó, IP Nguồn (Source IP) và IP Đích (Destination IP) được giữ nguyên vẹn xuyên suốt toàn bộ hành trình từ máy phát ban đầu đến máy nhận cuối cùng.
- Lớp 2 (Data Link Layer - Ethernet Frame): Mang tính giao vận cục bộ từng chặng (Hop-by-Hop). Do đó, MAC Nguồn và MAC Đích thay đổi liên tục ở mỗi phân đoạn liên kết mạng vật lý giữa các Router.

2. Quy trình xử lý của Router tại mỗi chặng (Hop):
- Bước 1 (Bóc tách Layer 2): Router nhận tín hiệu vật lý, kiểm tra mã lỗi CRC/FCS và bóc bỏ Ethernet Header (L2) cũ.
- Bước 2 (Xử lý Layer 3):
  + Giảm trường TTL (Time-To-Live) trong IP Header đi 1 đơn vị (TTL = TTL - 1). Nếu TTL = 0, Router hủy gói và gửi ICMP Time Exceeded.
  + Tính lại IP Header Checksum.
  + Đọc Destination IP, tra cứu Bảng định tuyến (Routing Table) để tìm cổng ra (Egress Interface) và địa chỉ IP của Hop kế tiếp (Next-hop IP).
- Bước 3 (Đóng gói Layer 2 mới):
  + Tra bảng ARP tìm địa chỉ MAC của Next-Hop.
  + Tạo Ethernet Header mới: Gán Source MAC là MAC của cổng ra trên Router, Destination MAC là MAC của thiết bị chặng tiếp theo.
  + Tính toán mã kiểm tra FCS mới và đẩy Frame ra đường truyền vật lý.`,
    keywords: ['hop-by-hop', 'end-to-end', 'ip nguồn giữ nguyên', 'ip đích giữ nguyên', 'mac thay đổi', 'bóc bỏ header', 'ttl-1', 'time to live', 'tra cứu routing table', 'arp next-hop', 'đóng gói mới']
  }
];

const INITIAL_FLASHCARDS = [
  // Flashcards Chương 1
  { term: 'Internet ("Network of networks")', def: 'Nhóm các network liên kết với nhau, giúp các máy tính truyền nhận dữ liệu từ xa dù không cùng phân đoạn mạng cục bộ.' },
  { term: 'Packet (Gói dữ liệu)', def: 'Dữ liệu được chia nhỏ, gồm phần Tiêu đề (Header) chứa thông tin điều khiển và phần Payload chứa dữ liệu thực.' },
  { term: 'Giao thức (Protocol)', def: 'Tập hợp các quy tắc chuẩn xác định phương thức giao tiếp chung giữa các thiết bị trong mạng.' },
  { term: 'Mô hình 7 tầng OSI', def: 'Physical (1) -> Data Link (2) -> Network (3) -> Transport (4) -> Session (5) -> Presentation (6) -> Application (7).' },
  { term: 'Mô hình 4 tầng TCP/IP', def: 'Network Access / Link (1) -> Internet (2) -> Transport (3) -> Application (4).' },
  { term: 'Presentation Layer (Layer 6)', def: 'Đảm nhận 3 vai trò: Formatting (chuyển đổi JSON/XML), Encryption (mã hóa SSL/TLS) và Compression (nén dữ liệu).' },
  { term: 'Session Layer (Layer 5)', def: 'Trình quản lý hội thoại, mở/đóng phiên, chèn mốc kiểm soát Checkpoints để tiếp tục truyền nếu đứt kết nối.' },
  { term: 'Transport Layer (Layer 4)', def: 'Truyền thông End-to-End, phân đoạn (Segmentation) & tái hợp, kiểm soát luồng (Flow Control) và kiểm soát lỗi (Error Control).' },
  { term: 'Chuỗi PDU (Encapsulation)', def: 'Application (Data) -> Transport (Segment) -> Network (Packet) -> Data Link (Frame) -> Physical (Bits).' },
  { term: 'Hub vs Switch vs Router', def: 'Hub: Layer 1, phát tràn, 1 collision domain. Switch: Layer 2, học MAC, chia nhỏ collision domain. Router: Layer 3, định tuyến IP, chia broadcast domain.' },
  
  // Flashcards Chương 2
  { term: 'Tầng Physical (Layer 1)', def: 'Chịu trách nhiệm chuyển đổi luồng bit logic (0 và 1) thành các tín hiệu vật lý (xung điện, ánh sáng, sóng) để truyền qua môi trường.' },
  { term: 'Mã hóa Manchester', def: 'Kỹ thuật mã hóa tín hiệu trong 10 Mbps Ethernet, truyền với tốc độ 20 triệu trạng thái/giây nhằm đồng bộ hóa đồng hồ.' },
  { term: 'Cáp UTP vs STP', def: 'UTP không có bọc kim loại, rẻ và mềm dẻo. STP có lớp lá kim loại/lưới bện chống nhiễu điện từ (EMI) mạnh cho môi trường công nghiệp.' },
  { term: 'Cat6 vs Cat6A', def: 'Cat6 truyền 10G ở cự ly <55m (250MHz). Cat6A truyền 10G trên toàn bộ 100m (500MHz), tiêu chuẩn hiện đại cho Data Center.' },
  { term: 'Đầu nối RJ45 (8P8C)', def: 'Đầu bấm mạng chuẩn 8 chân đồng cho 4 cặp dây xoắn, cự ly tối đa 100m, chuẩn bấm T568A và T568B.' },
  { term: 'Single-Mode Fiber (SMF)', def: 'Lõi nhỏ (8-10µm), nguồn phát Laser, không bị tán sắc chế độ, truyền xa hàng chục km (WAN, viễn thông).' },
  { term: 'Multi-Mode Fiber (MMF)', def: 'Lõi lớn (50-62.5µm), nguồn phát LED/VCSEL, bị tán sắc chế độ cao, truyền cự ly ngắn <2km (LAN, Data Center).' },
  { term: 'Đầu nối quang LC, SC, ST, FC', def: 'LC: đầu nhỏ cắm module SFP; SC: đầu vuông push-pull; ST: đầu tròn gài bayonet; FC: đầu tròn xoắn ren.' },
  { term: 'Hộp phối quang (ODF)', def: 'Thiết bị quản lý, bảo vệ mối hàn cáp quang (khay hàn splice tray) và phân phối các đầu cắm patch cord trong tủ rack.' },
  { term: 'Media Converter', def: 'Bộ chuyển đổi quang điện, giúp chuyển tín hiệu mạng từ cáp đồng RJ45 sang cáp quang để truyền xa hàng chục km.' },
  { term: 'Mô-đun SFP / SFP+', def: 'Bộ thu phát quang nhỏ gọn cắm hot-swap vào Switch. SFP hỗ trợ 1 Gbps, SFP+ hỗ trợ tốc độ lên đến 10 Gbps.' },
  { term: 'Bảng cắm cáp (Patch Panel)', def: 'Bảng quản lý kết nối trung gian trong tủ rack, tránh cắm rút trực tiếp làm hỏng cổng Switch đắt tiền.' },
  { term: 'Địa chỉ MAC (Media Access Control)', def: 'Địa chỉ vật lý 48 bit (6 Bytes) dạng Hex, gắn cố định vào ROM của card mạng (NIC), định danh duy nhất thiết bị ở Layer 2.' },
  { term: 'Khung Ethernet II', def: 'PDU của tầng Data Link: Dest MAC (6B) + Source MAC (6B) + EtherType (2B) + Payload (46-1500B) + FCS (4B).' },
  { term: 'EtherType 0x0800 & 0x0806', def: '0x0800 chỉ định gói tin IP version 4 (IPv4); 0x0806 chỉ định gói tin giao thức ARP.' },
  { term: 'CSMA/CD', def: 'Carrier Sense (nghe đường truyền) - Multiple Access (nhiều máy chung kênh) - Collision Detection (phát hiện va chạm -> Jam signal -> Exponential backoff).' },
  { term: 'Half-Duplex vs Full-Duplex', def: 'Half-duplex: truyền luân phiên 1 chiều (như bộ đàm, Hub). Full-duplex: truyền 2 chiều đồng thời không va chạm (như điện thoại, Switch).' },
  { term: 'Collision Domain', def: 'Vùng mạng xảy ra va chạm. Hub = 1 Collision Domain chung cho mọi cổng. Switch = Mỗi cổng là 1 Collision Domain riêng biệt.' },
  { term: 'Địa chỉ MAC Broadcast', def: 'Địa chỉ FF:FF:FF:FF:FF:FF, được gửi tới tất cả thiết bị trong cùng Broadcast Domain.' },
  { term: 'Quy tắc học của Switch', def: 'Switch CHỈ học từ địa chỉ Source MAC của frame đi vào cổng. Tuyệt đối KHÔNG BAO GIỜ học từ Destination MAC.' },
  { term: '3 Hành vi của Switch', def: 'Forwarding (chuyển tiếp cổng đã biết), Filtering (drop nếu nguồn và đích cùng cổng), Flooding (phát tràn ra mọi cổng trừ cổng vào khi chưa biết MAC hoặc broadcast).' },
  { term: 'Giao thức ARP', def: 'Address Resolution Protocol: Ánh xạ từ địa chỉ IPv4 logic sang địa chỉ MAC vật lý trong cùng mạng LAN.' },
  { term: 'ARP Request vs ARP Reply', def: 'ARP Request gửi dạng Broadcast (FF:FF:FF:FF:FF:FF). ARP Reply gửi dạng Unicast trực tiếp về MAC của máy hỏi.' },
  { term: 'Default Gateway', def: 'Địa chỉ Router đóng vai trò cửa ngõ chuyển tiếp mọi lưu lượng ra ngoài phân đoạn mạng cục bộ (khác Subnet).' },
  { term: 'Nguyên tắc Hop-by-Hop vs End-to-End', def: 'IP nguồn và IP đích (Layer 3) giữ nguyên suốt hành trình. MAC nguồn và MAC đích (Layer 2) thay đổi liên tục qua từng Router.' }
];

// ============================================================
// CHƯƠNG 4: TẦNG NETWORK — ĐỊA CHỈ IPv4 & ĐỊNH TUYẾN P1
// (Nạp từ PDF: Chương 4_ Tầng Network - Địa chỉ IPv4 & Định tuyến - P1.pdf, 47 trang)
// ============================================================

// --- THÊM CÂU TRẮC NGHIỆM CHƯƠNG 4 ---
INITIAL_QUIZ_DATA.push(
  // === LÝ THUYẾT IPv4 ===
  {
    id: 'c4-1',
    topic: 'chap4',
    question: 'Địa chỉ IPv4 có cấu trúc như thế nào về độ dài và cách biểu diễn?',
    options: [
      '64 bit, gồm 8 octet, giá trị mỗi octet từ 0 đến 255',
      '32 bit, gồm 4 octet, mỗi octet có giá trị thập phân từ 0 đến 255, ngăn cách bởi dấu chấm',
      '128 bit, gồm 16 octet, biểu diễn bằng hệ thập lục phân',
      '32 bit, gồm 4 octet, mỗi octet từ 1 đến 254'
    ],
    correct: 1,
    explanation: 'IPv4 có độ dài 32 bit chia thành 4 phần bằng nhau gọi là octet, mỗi octet có giá trị thập phân từ 0 đến 255 và được ngăn cách bởi dấu chấm. Ví dụ: 192.168.10.25.'
  },
  {
    id: 'c4-2',
    topic: 'chap4',
    question: 'Địa chỉ IPv4 luôn được chia thành 2 phần. Ranh giới giữa 2 phần đó được xác định bởi yếu tố nào?',
    options: [
      'Địa chỉ MAC của thiết bị',
      'Số cổng (Port number) của ứng dụng',
      'Prefix Length (ký hiệu /n) hoặc Subnet Mask',
      'Giao thức tầng Transport (TCP hoặc UDP)'
    ],
    correct: 2,
    explanation: 'Địa chỉ IPv4 luôn có 2 phần: Network Portion (phần mạng) và Host Portion (phần máy chủ). Ranh giới giữa 2 phần này được xác định bởi Prefix Length (/n) hoặc Subnet Mask tương ứng.'
  },
  {
    id: 'c4-3',
    topic: 'chap4',
    question: 'Địa chỉ Network Address (địa chỉ mạng) có đặc điểm nhận dạng cốt lõi là gì?',
    options: [
      'Tất cả các bit thuộc phần Network đều bằng 0',
      'Tất cả các bit thuộc phần Host đều có giá trị bằng 0 (Host bits = 0)',
      'Tất cả các bit thuộc phần Host đều có giá trị bằng 1 (Host bits = 1)',
      'Octet cuối cùng luôn có giá trị là 0 bất kể Prefix'
    ],
    correct: 1,
    explanation: 'Network Address là địa chỉ đại diện cho toàn bộ subnet. Đặc điểm nhận dạng: tất cả các bit thuộc phần Host đều bằng 0. Địa chỉ này không được gán cho bất kỳ thiết bị host nào.'
  },
  {
    id: 'c4-4',
    topic: 'chap4',
    question: 'Broadcast Address có đặc điểm gì khác biệt so với Network Address?',
    options: [
      'Giống hệt Network Address, chỉ khác tên gọi',
      'Tất cả bit Host = 0, dùng để gửi dữ liệu cho 1 thiết bị duy nhất',
      'Tất cả các bit thuộc phần Host được bật lên 1 (Host bits = 1), dùng để gửi đồng thời đến tất cả host trong subnet',
      'Chỉ xuất hiện trong mạng IPv6, không có trong IPv4'
    ],
    correct: 2,
    explanation: 'Broadcast Address trái ngược với Network Address: tất cả bit Host = 1. Thiết bị dùng địa chỉ này khi muốn gửi dữ liệu đồng thời đến tất cả host trong cùng một subnet.'
  },
  {
    id: 'c4-5',
    topic: 'chap4',
    question: '3 dải địa chỉ IPv4 Private (RFC 1918) được quy định là những dải nào?',
    options: [
      '10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16',
      '10.0.0.0/8, 172.0.0.0/8, 192.0.0.0/8',
      '172.16.0.0/16, 192.168.1.0/24, 10.10.0.0/16',
      '224.0.0.0/4, 240.0.0.0/4, 169.254.0.0/16'
    ],
    correct: 0,
    explanation: 'RFC 1918 quy định 3 dải Private: Dải 1: 10.0.0.0/8 (~16 triệu IP); Dải 2: 172.16.0.0/12 (~1 triệu IP); Dải 3: 192.168.0.0/16 (~65k IP). Các dải này không được định tuyến trực tiếp trên Internet.'
  },
  {
    id: 'c4-6',
    topic: 'chap4',
    question: 'NAT (Network Address Translation) thực hiện chức năng gì và thường được đặt ở thiết bị nào?',
    options: [
      'Phân giải tên miền thành địa chỉ IP, đặt tại DNS Server',
      'Chuyển đổi địa chỉ IP giữa các không gian mạng (thường từ Private sang Public), thực hiện tại Router hoặc Firewall biên',
      'Mã hóa toàn bộ lưu lượng mạng bằng AES-256, đặt tại Switch lõi',
      'Phân phối địa chỉ IP động cho các thiết bị, thực hiện tại DHCP Server'
    ],
    correct: 1,
    explanation: 'NAT chuyển đổi địa chỉ IP Private sang Public (và ngược lại) để các thiết bị nội bộ có thể truy cập Internet. Quá trình này thường thực hiện tại Router hoặc Firewall biên của tổ chức.'
  },
  {
    id: 'c4-7',
    topic: 'chap4',
    question: 'CIDR (Classless Inter-Domain Routing) ra đời năm 1993 thay thế Classful vì lý do cốt lõi nào?',
    options: [
      'Classful quá phức tạp và tốn nhiều bộ nhớ Router',
      'Classful gây lãng phí địa chỉ IPv4 nghiêm trọng (ví dụ doanh nghiệp cần 500 IP phải nhận 65.534 IP Class B)',
      'Classful không hỗ trợ giao thức TCP/IP',
      'Classful chỉ hoạt động được với cáp quang, không hỗ trợ cáp đồng'
    ],
    correct: 1,
    explanation: 'Classful phân chia cứng nhắc (A/8, B/16, C/24) gây lãng phí khổng lồ. Ví dụ: cần 500 IP → 1 Class C (254 IP) không đủ, nhưng 1 Class B (65.534 IP) lãng phí >65.000 IP. CIDR giải quyết bằng Prefix linh hoạt /0 đến /32.'
  },
  {
    id: 'c4-8',
    topic: 'chap4',
    question: 'Công thức tính số Host usable (khả dụng để gán cho thiết bị) trong một subnet là gì?',
    options: [
      'Host usable = 2^Prefix',
      'Host usable = 2^(32 - Prefix) - 2',
      'Host usable = 2^(32 - Prefix)',
      'Host usable = 32 - Prefix'
    ],
    correct: 1,
    explanation: 'Công thức: Host usable = 2^(32-Prefix) - 2. Phải trừ 2 vì loại bỏ: (1) Network Address (Host bits = 0) và (2) Broadcast Address (Host bits = 1). Ví dụ /26: 2^6 - 2 = 64 - 2 = 62 host.'
  },
  {
    id: 'c4-9',
    topic: 'chap4',
    question: 'Phương pháp tính Block Size (Bước nhảy) giữa các subnet liên tiếp được tính theo công thức nào?',
    options: [
      'Block Size = Prefix Length x 2',
      'Block Size = 2^(32 - Prefix)',
      'Block Size = 256 - (giá trị octet thay đổi của Subnet Mask)',
      'Block Size = 255 - Prefix Length'
    ],
    correct: 2,
    explanation: 'Block Size = 256 - (giá trị octet thay đổi của Subnet Mask). Ví dụ /26 có Mask .192 → Block Size = 256 - 192 = 64. Nghĩa là mỗi subnet kế tiếp nhau cách nhau 64 địa chỉ: .0/26, .64/26, .128/26, .192/26.'
  },
  {
    id: 'c4-10',
    topic: 'chap4',
    question: 'Khi truyền đến Local Destination (cùng subnet) và Remote Destination (khác subnet), thiết bị hành xử khác nhau thế nào?',
    options: [
      'Cả hai trường hợp đều gửi trực tiếp, không cần qua Router',
      'Local: gửi frame trực tiếp đến đích Layer 2 (không qua Router); Remote: gửi frame đến Default Gateway để Router chuyển tiếp',
      'Local: phải đi qua Router; Remote: gửi trực tiếp',
      'Cả hai đều phải gửi qua DNS Server trước'
    ],
    correct: 1,
    explanation: 'Local (cùng subnet): gửi frame trực tiếp đến MAC của đích qua ARP, không cần Router. Remote (khác subnet): gửi frame đến Default Gateway (MAC của Router), Router tiếp tục chuyển tiếp packet theo IP đích.'
  },

  // === BÀI TẬP TÍNH TOÁN TRẮC NGHIỆM ===
  {
    id: 'c4-calc-1',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Cho địa chỉ IP 192.168.10.25/24. Network Address và Broadcast Address của mạng này là gì?',
    options: [
      'Network: 192.168.10.1 | Broadcast: 192.168.10.254',
      'Network: 192.168.10.0 | Broadcast: 192.168.10.255',
      'Network: 192.168.0.0 | Broadcast: 192.168.255.255',
      'Network: 192.168.10.25 | Broadcast: 192.168.10.255'
    ],
    correct: 1,
    explanation: '/24 = Mask 255.255.255.0. Network Address: tất cả bit Host (8 bit octet 4) = 0 → 192.168.10.0. Broadcast Address: tất cả bit Host = 1 → 192.168.10.255. Dải Host khả dụng: .1 đến .254 (254 host).'
  },
  {
    id: 'c4-calc-2',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Prefix /26 có Subnet Mask thập phân là gì và có bao nhiêu Host usable?',
    options: [
      'Mask: 255.255.255.192 | Host usable: 62',
      'Mask: 255.255.255.224 | Host usable: 30',
      'Mask: 255.255.255.128 | Host usable: 126',
      'Mask: 255.255.255.240 | Host usable: 14'
    ],
    correct: 0,
    explanation: '/26: Host bits = 32 - 26 = 6. Mask: 26 bit 1 → 11111111.11111111.11111111.11000000 = 255.255.255.192. Tổng IP = 2^6 = 64. Host usable = 64 - 2 = 62 (trừ Network và Broadcast).'
  },
  {
    id: 'c4-calc-3',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Địa chỉ 192.168.10.130/26 thuộc về subnet nào? (Block Size = 64)',
    options: [
      '192.168.10.0/26 (dải .0 - .63)',
      '192.168.10.64/26 (dải .64 - .127)',
      '192.168.10.128/26 (dải .128 - .191)',
      '192.168.10.192/26 (dải .192 - .255)'
    ],
    correct: 2,
    explanation: 'Block Size = 256 - 192 = 64. Các subnet: .0/26 (.0-.63), .64/26 (.64-.127), .128/26 (.128-.191), .192/26 (.192-.255). Octet cuối IP = 130. So sánh: 128 ≤ 130 < 192 → thuộc subnet 192.168.10.128/26.'
  },
  {
    id: 'c4-calc-4',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Subnet 192.168.10.128/26: Network Address, Broadcast Address và số Host usable là bao nhiêu?',
    options: [
      'Network: .128 | Broadcast: .190 | Host: .129 đến .189',
      'Network: .128 | Broadcast: .191 | Host: .129 đến .190 (62 host)',
      'Network: .129 | Broadcast: .192 | Host: .130 đến .191',
      'Network: .128 | Broadcast: .255 | Host: .129 đến .254'
    ],
    correct: 1,
    explanation: 'Subnet 192.168.10.128/26: Network = .128. Broadcast = 128 + 64 - 1 = 191 → 192.168.10.191. Dải Host: .129 đến .190. Host usable = 2^6 - 2 = 62.'
  },
  {
    id: 'c4-calc-5',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Prefix /27 có bao nhiêu Host usable và Block Size là bao nhiêu?',
    options: [
      'Host usable: 62 | Block Size: 64',
      'Host usable: 30 | Block Size: 32',
      'Host usable: 14 | Block Size: 16',
      'Host usable: 126 | Block Size: 128'
    ],
    correct: 1,
    explanation: '/27: Host bits = 5. Host usable = 2^5 - 2 = 32 - 2 = 30. Mask = 255.255.255.224 (octet cuối = 224). Block Size = 256 - 224 = 32. Các subnet: .0/27, .32/27, .64/27, .96/27...'
  },
  {
    id: 'c4-calc-6',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Vì sao Prefix /30 là lựa chọn tối ưu cho đường kết nối Point-to-Point giữa 2 Router?',
    options: [
      'Vì /30 có 30 host usable, đủ cho 30 Router kết nối',
      'Vì /30 có Host usable = 2^2 - 2 = 2, vừa đủ cho 2 interface Router, tránh lãng phí IP',
      'Vì /30 là Prefix lớn nhất có thể dùng cho IPv4',
      'Vì /30 không có địa chỉ Broadcast nên truyền nhanh hơn'
    ],
    correct: 1,
    explanation: '/30: Host bits = 2. Host usable = 2^2 - 2 = 4 - 2 = 2. Đường P2P chỉ cần 2 địa chỉ (1 cho mỗi interface Router). /30 cấp vừa đủ 2 host, không lãng phí. Mask: 255.255.255.252, Block Size = 4.'
  },
  {
    id: 'c4-calc-7',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Prefix /22 có bao nhiêu Host usable và Subnet Mask thập phân là gì?',
    options: [
      'Host usable: 510 | Mask: 255.255.254.0',
      'Host usable: 1022 | Mask: 255.255.252.0',
      'Host usable: 2046 | Mask: 255.255.248.0',
      'Host usable: 254 | Mask: 255.255.255.0'
    ],
    correct: 1,
    explanation: '/22: Host bits = 10. Host usable = 2^10 - 2 = 1024 - 2 = 1022. Mask: 22 bit 1 → 11111111.11111111.11111100.00000000 = 255.255.252.0. Block Size = 256 - 252 = 4 (thay đổi ở octet thứ 3).'
  },
  {
    id: 'c4-calc-8',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Cho IP 172.16.45.100/20. Địa chỉ này thuộc Network Address nào? (Block Size /20 = 16, thay đổi ở octet thứ 3)',
    options: [
      '172.16.32.0/20',
      '172.16.40.0/20',
      '172.16.45.0/20',
      '172.16.48.0/20'
    ],
    correct: 1,
    explanation: 'Mask /20 = 255.255.240.0. Block Size = 256 - 240 = 16 (tại octet 3). Liệt kê octet 3: 0, 16, 32, 40, 48... Octet 3 của IP = 45. So sánh: 40 ≤ 45 < 48 → thuộc 172.16.40.0/20. Broadcast: 172.16.47.255.'
  },
  {
    id: 'c4-calc-9',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Một công ty cần ít nhất 50 host trong một subnet. Prefix nhỏ nhất (tiết kiệm IP nhất) nào đáp ứng yêu cầu?',
    options: [
      '/25 → Host usable = 126 (đủ nhưng lãng phí)',
      '/26 → Host usable = 62 (đủ và tối ưu nhất)',
      '/27 → Host usable = 30 (không đủ)',
      '/24 → Host usable = 254 (đủ nhưng quá lãng phí)'
    ],
    correct: 1,
    explanation: 'Cần >= 50 host. /27 cho 30 host (không đủ). /26 cho 62 host (đủ và tiết kiệm nhất vì vừa sát nhu cầu). /25 cho 126 host (lãng phí gần 2x). Đáp án: /26 = 255.255.255.192, Block Size = 64.'
  },
  {
    id: 'c4-calc-10',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Chia mạng 192.168.1.0/24 thành các subnet /26. Subnet thứ 3 (đếm từ đầu) có Network Address là gì?',
    options: [
      '192.168.1.0/26',
      '192.168.1.64/26',
      '192.168.1.128/26',
      '192.168.1.192/26'
    ],
    correct: 2,
    explanation: 'Block Size /26 = 64. Subnet 1: 192.168.1.0/26 (.0-.63). Subnet 2: 192.168.1.64/26 (.64-.127). Subnet 3: 192.168.1.128/26 (.128-.191). Subnet 4: 192.168.1.192/26 (.192-.255).'
  },
  {
    id: 'c4-calc-11',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Hai địa chỉ 10.0.0.50/27 và 10.0.0.70/27 có cùng thuộc một subnet không?',
    options: [
      'Có, cùng subnet 10.0.0.0/27',
      'Không. .50 thuộc 10.0.0.32/27 (dải .32-.63); .70 thuộc 10.0.0.64/27 (dải .64-.95) → 2 subnet khác nhau',
      'Có, cùng subnet 10.0.0.64/27',
      'Không đủ thông tin để xác định'
    ],
    correct: 1,
    explanation: 'Block Size /27 = 32. Subnet: .0/27 (0-31), .32/27 (32-63), .64/27 (64-95)... .50 → 32≤50≤63 thuộc .32/27. .70 → 64≤70≤95 thuộc .64/27. KHÁC NHAU → không giao tiếp trực tiếp Layer 2, cần Router.'
  },
  {
    id: 'c4-calc-12',
    topic: 'chap4',
    question: '[TÍNH TOÁN] Cho dải 10.0.0.0/30 (đường Point-to-Point). Network Address, Broadcast Address và 2 host khả dụng là gì?',
    options: [
      'Network: 10.0.0.0 | Broadcast: 10.0.0.4 | Host: 10.0.0.1 và 10.0.0.3',
      'Network: 10.0.0.0 | Broadcast: 10.0.0.3 | Host: 10.0.0.1 và 10.0.0.2',
      'Network: 10.0.0.1 | Broadcast: 10.0.0.4 | Host: 10.0.0.2 và 10.0.0.3',
      'Network: 10.0.0.0 | Broadcast: 10.0.0.2 | Host: 10.0.0.1 duy nhất'
    ],
    correct: 1,
    explanation: '/30: Block Size = 256 - 252 = 4. Tổng 4 địa chỉ: Network = 10.0.0.0, Host 1 = 10.0.0.1 (Router A), Host 2 = 10.0.0.2 (Router B), Broadcast = 10.0.0.3. Subnet tiếp theo: 10.0.0.4/30.'
  }
);

// --- THÊM CÂU HỎI TỰ LUẬN CHƯƠNG 4 ---
INITIAL_ESSAY_DATA.push(
  {
    id: 'es-c4-1',
    topic: 'chap4',
    title: '[Tổng hợp] Phân tích đầy đủ một địa chỉ IPv4: Network, Broadcast, Host usable',
    question: 'Cho địa chỉ IP 192.168.10.130/26. Hãy xác định đầy đủ: (1) Subnet Mask dạng thập phân, (2) Block Size, (3) Network Address, (4) Broadcast Address, (5) Dải địa chỉ Host khả dụng, (6) Số Host usable. Trình bày từng bước tính toán chi tiết.',
    suggestedAnswer: `Phân tích địa chỉ 192.168.10.130/26 từng bước:

1. Subnet Mask dạng thập phân:
- Prefix /26: 26 bit = 1 (phần Network), 6 bit = 0 (phần Host).
- Nhị phân: 11111111.11111111.11111111.11000000
- Thập phân: 255.255.255.192

2. Block Size (Bước nhảy):
- Block Size = 256 - (octet thay đổi) = 256 - 192 = 64

3. Liệt kê các subnet /26 trong dải 192.168.10.x:
- Subnet 1: 192.168.10.0/26   → Dải: .0 đến .63
- Subnet 2: 192.168.10.64/26  → Dải: .64 đến .127
- Subnet 3: 192.168.10.128/26 → Dải: .128 đến .191  ← IP .130 nằm đây
- Subnet 4: 192.168.10.192/26 → Dải: .192 đến .255

4. Xác định subnet chứa IP .130: so sánh 128 ≤ 130 < 192 → Subnet 3.

5. Network Address:   192.168.10.128 (đầu subnet, Host bits = 0)
6. Broadcast Address: 192.168.10.191 (= 128 + 64 - 1 = 191, Host bits = 1)
7. Dải Host khả dụng: 192.168.10.129 đến 192.168.10.190
8. Số Host usable:    2^6 - 2 = 64 - 2 = 62 host`,
    keywords: ['255.255.255.192', 'block size', '64', '192.168.10.128', '192.168.10.191', '62', 'host usable', '129', '190', '/26', 'subnet mask', '26 bit']
  },
  {
    id: 'es-c4-2',
    topic: 'chap4',
    title: '[Tính toán] Chia mạng 192.168.1.0/24 thành 4 subnet /26',
    question: 'Chia mạng 192.168.1.0/24 thành các subnet /26. Hãy: (1) Tính Block Size, (2) Liệt kê TẤT CẢ 4 subnet với Network Address, Broadcast Address và dải Host của từng subnet, (3) Tính số Host usable của mỗi subnet.',
    suggestedAnswer: `Chia mạng 192.168.1.0/24 thành subnet /26:

1. Thông số cơ bản:
- Prefix gốc /24 → mượn thêm 2 bit (26 - 24 = 2) cho phần Subnet ID.
- Số subnet = 2^2 = 4 subnet.
- Subnet Mask mới: 255.255.255.192
- Block Size = 256 - 192 = 64
- Host usable/subnet = 2^6 - 2 = 62 host

2. Liệt kê 4 subnet:

Subnet 1: 192.168.1.0/26
  Network:   192.168.1.0
  Broadcast: 192.168.1.63
  Dải Host:  192.168.1.1 → 192.168.1.62  (62 host)

Subnet 2: 192.168.1.64/26
  Network:   192.168.1.64
  Broadcast: 192.168.1.127
  Dải Host:  192.168.1.65 → 192.168.1.126 (62 host)

Subnet 3: 192.168.1.128/26
  Network:   192.168.1.128
  Broadcast: 192.168.1.191
  Dải Host:  192.168.1.129 → 192.168.1.190 (62 host)

Subnet 4: 192.168.1.192/26
  Network:   192.168.1.192
  Broadcast: 192.168.1.255
  Dải Host:  192.168.1.193 → 192.168.1.254 (62 host)

3. Kiểm tra: 4 subnet × 64 địa chỉ = 256 = toàn bộ /24. Đúng!`,
    keywords: ['block size 64', '4 subnet', '255.255.255.192', '62 host', '192.168.1.0', '192.168.1.63', '192.168.1.64', '192.168.1.127', '192.168.1.128', '192.168.1.191', '192.168.1.192', '192.168.1.255', 'mượn 2 bit']
  },
  {
    id: 'es-c4-3',
    topic: 'chap4',
    title: '5 lý do tại sao phải chia mạng con (Subnetting) trong hệ thống mạng',
    question: 'Trình bày đầy đủ 5 lý do kỹ thuật và vận hành cốt lõi tại sao các kỹ sư mạng bắt buộc phải chia subnet. Với mỗi lý do, hãy giải thích cơ chế kỹ thuật và lợi ích đạt được.',
    suggestedAnswer: `5 Lý do bắt buộc phải chia Subnet (Subnetting):

1. Thu Nhỏ Broadcast Domain & Tăng Hiệu Năng:
Khi không chia subnet, mọi gói ARP/DHCP Broadcast phát đến toàn bộ thiết bị trong mạng → Broadcast Storm, tiêu tốn CPU. Khi chia subnet, Broadcast bị khoanh vùng trong từng subnet nhỏ → giảm tải CPU, tăng tốc độ thực sự.

2. Tiết Kiệm & Tối Ưu Hóa Địa Chỉ IP (VLSM):
IPv4 có giới hạn nghiêm ngặt. VLSM cho phép cấp phát IP vừa đủ theo đúng nhu cầu: /28 (14 host) cho phòng nhỏ, /30 (2 host) cho đường P2P, tránh lãng phí tối đa.

3. Tăng Cường Bảo Mật & Kiểm Soát Truy Cập:
Thiết bị cùng subnet giao tiếp trực tiếp Layer 2, bypass Firewall. Khi chia subnet, dữ liệu giữa các phòng ban phải qua Router/Firewall → áp dụng ACLs, bảo vệ dữ liệu nhạy cảm.

4. Cô Lập & Khoanh Vùng Xử Lý Sự Cố (Fault Isolation):
Máy nhiễm malware hoặc NIC gây bão tín hiệu chỉ ảnh hưởng trong subnet đó. Quản trị viên ngắt subnet lỗi tại Gateway mà không làm gián đoạn toàn hệ thống.

5. Định Tuyến Phân Cấp & Thu Gọn Routing Table (Route Summarization):
Không chia subnet: Router lưu route đến từng IP riêng lẻ → bảng phình to. Có subnet: gom nhiều subnet thành 1 route đại diện (192.168.0.0/22 đại diện 4 subnet /24) → giảm kích thước Routing Table, tăng tốc Router.`,
    keywords: ['broadcast domain', 'broadcast storm', 'vlsm', 'tiết kiệm ip', 'bảo mật', 'acl', 'firewall', 'cô lập sự cố', 'fault isolation', 'route summarization', 'routing table', '5 lý do', 'cpu', 'malware']
  },
  {
    id: 'es-c4-4',
    topic: 'chap4',
    title: 'So sánh Classful (A/B/C) và Classless (CIDR) trong IPv4',
    question: 'So sánh hệ thống Classful và CIDR: (1) Thông số kỹ thuật Class A, B, C (bit đầu, Mask mặc định, số host), (2) Hạn chế chí mạng của Classful, (3) Ưu điểm vượt trội của CIDR.',
    suggestedAnswer: `So sánh Classful vs Classless (CIDR):

1. Hệ thống Classful (RFC 791, 1981):

Class A (/8): Bit đầu = 0. Octet 1 từ 1-126. Mask: 255.0.0.0.
→ 8 bit Network, 24 bit Host. 126 mạng, ~16.7 triệu host/mạng.

Class B (/16): Bit đầu = 10. Octet 1 từ 128-191. Mask: 255.255.0.0.
→ 16 bit Network, 16 bit Host. 16.384 mạng, 65.534 host/mạng.

Class C (/24): Bit đầu = 110. Octet 1 từ 192-223. Mask: 255.255.255.0.
→ 24 bit Network, 8 bit Host. 2 triệu+ mạng, 254 host/mạng.

2. Hạn chế chí mạng của Classful:
- Lãng phí IP nghiêm trọng: cần 500 IP → 1 Class C (254 IP) không đủ, nhưng 1 Class B (65.534 IP) lãng phí >65.000 IP.
- Phân chia cứng nhắc, không tùy chỉnh theo nhu cầu thực tế.
- Gây khủng hoảng cạn kiệt IP từ giữa thập niên 1990.

3. Ưu điểm của CIDR (1993):
- Loại bỏ khái niệm Class A/B/C trên Internet.
- Prefix /n linh hoạt từ /0 đến /32, đặt ở bất kỳ vị trí bit nào (/20, /27, /30...).
- Cấp phát chính xác: /28 cho 14 host, /30 cho 2 host (Point-to-Point).
- Route Aggregation: gom tuyến linh hoạt, thu gọn bảng định tuyến toàn cầu.`,
    keywords: ['class a', 'class b', 'class c', '/8', '/16', '/24', '255.0.0.0', '255.255.0.0', '255.255.255.0', 'cidr', 'prefix', 'lãng phí', 'classful', 'classless', 'route aggregation', '65534', '254', '126']
  },
  {
    id: 'es-c4-5',
    topic: 'chap4',
    title: '[Thiết kế] Chọn Prefix tối ưu và tính thông số cho 2 tình huống thực tế',
    question: 'Tình huống A: Công ty cần subnet chứa ~1000 host cho phòng máy chủ. Chọn Prefix nào tối ưu? Tính đủ Mask, Block Size, Network, Broadcast, số Host. Tình huống B: Thiết kế đường Point-to-Point giữa 2 Router dùng /30, cho dải 10.0.0.0/30. Giải thích lý do chọn /30.',
    suggestedAnswer: `Bài tập thiết kế mạng:

PHẦN A: Subnet cho ~1000 host
Yêu cầu: >= 1000 host usable.

Kiểm tra Prefix:
- /22: 2^10 - 2 = 1022 host → ĐỦ và tối ưu nhất
- /21: 2^11 - 2 = 2046 host → đủ nhưng lãng phí 2x

Chọn /22 (tối ưu nhất).

Thông số /22 (ví dụ 192.168.0.0/22):
- Subnet Mask: 255.255.252.0 (nhị phân: 11111111.11111111.11111100.00000000)
- Block Size: 256 - 252 = 4 (thay đổi ở octet 3)
- Network Address: 192.168.0.0
- Broadcast Address: 192.168.3.255 (= tăng octet 3 thêm Block 4 - 1 → .3.255)
- Dải Host: 192.168.0.1 đến 192.168.3.254
- Số Host usable: 1022 host

PHẦN B: Đường Point-to-Point /30
Lý do chọn /30: Đường P2P chỉ cần đúng 2 địa chỉ IP (1 cho mỗi interface Router).
/30: Host bits = 2 → Host usable = 2^2 - 2 = 2. Vừa đủ, không lãng phí.

Thông số 10.0.0.0/30:
- Subnet Mask: 255.255.255.252
- Block Size: 256 - 252 = 4
- Network Address: 10.0.0.0
- Broadcast Address: 10.0.0.3
- Host 1 (Router A): 10.0.0.1
- Host 2 (Router B): 10.0.0.2`,
    keywords: ['/22', '1022', '255.255.252.0', 'block size 4', '/30', '255.255.255.252', '2 host', 'point-to-point', '10.0.0.1', '10.0.0.2', '10.0.0.3', 'host usable', 'network', 'broadcast']
  }
);

// --- THÊM FLASHCARD CHƯƠNG 4 ---
INITIAL_FLASHCARDS.push(
  { term: 'IPv4 — Cấu trúc cơ bản', def: '32 bit = 4 octet, mỗi octet 0-255, ngăn cách dấu chấm. Gồm 2 phần: Network Portion và Host Portion. Ranh giới xác định bởi Prefix (/n) hoặc Subnet Mask.' },
  { term: 'Network Address', def: 'Địa chỉ mạng: tất cả bit Host = 0. Ví dụ 192.168.10.0/24. KHÔNG được gán cho host. Đây là địa chỉ đầu tiên của subnet.' },
  { term: 'Broadcast Address', def: 'Địa chỉ quảng bá: tất cả bit Host = 1. Ví dụ 192.168.10.255/24. Gửi đến mọi host trong subnet. KHÔNG được gán cho host.' },
  { term: 'Host usable = 2^(32-Prefix) - 2', def: 'Trừ 2 vì loại bỏ Network Address và Broadcast Address. Ví dụ /26: 2^6 - 2 = 62 host. /27: 2^5 - 2 = 30. /30: 2^2 - 2 = 2.' },
  { term: 'Block Size (Bước nhảy)', def: 'Block Size = 256 - (giá trị octet thay đổi của Subnet Mask). /26 → .192 → Block = 64. /27 → .224 → Block = 32. /30 → .252 → Block = 4.' },
  { term: 'Bảng Prefix nhanh', def: '/24→254h | /25→126h | /26→62h | /27→30h | /28→14h | /29→6h | /30→2h (P2P) | /22→1022h | /20→4094h.' },
  { term: 'IPv4 Private (RFC 1918)', def: '3 dải: 10.0.0.0/8 | 172.16.0.0/12 | 192.168.0.0/16. Dùng nội bộ LAN, không định tuyến Internet, cần NAT để ra ngoài.' },
  { term: 'NAT (Network Address Translation)', def: 'Kỹ thuật chuyển đổi IP Private → Public tại Router/Firewall biên, cho phép thiết bị nội bộ truy cập Internet.' },
  { term: 'Classful vs CIDR', def: 'Classful: cố định Class A(/8)=254h, B(/16)=65534h, C(/24)=254h → lãng phí. CIDR (1993): Prefix linh hoạt /0-/32, cấp phát chính xác.' },
  { term: 'Subnet Mask — Bản chất', def: 'Chuỗi 32 bit: bit Network = 1, bit Host = 0. /24↔255.255.255.0 | /26↔255.255.255.192 | /27↔255.255.255.224 | /30↔255.255.255.252.' },
  { term: '/30 — Point-to-Point', def: 'Prefix tối ưu cho liên kết 2 Router: 4 IP tổng, 2 host usable (1 mỗi interface), Block Size = 4. Mask: 255.255.255.252.' },
  { term: 'Cách tìm subnet chứa IP', def: '1. Tính Block Size từ Mask. 2. Liệt kê các mốc subnet. 3. So sánh octet thay đổi của IP. 4. IP nằm trong [Network, Broadcast] nào thì thuộc subnet đó.' },
  { term: 'Local vs Remote Destination', def: 'Local (cùng subnet): gửi frame trực tiếp Layer 2, không cần Router. Remote (khác subnet): phải gửi frame đến Default Gateway để Router chuyển tiếp.' },
  { term: 'Subnetting — 5 lý do cốt lõi', def: '1. Thu nhỏ Broadcast Domain. 2. Tiết kiệm IP (VLSM). 3. Bảo mật ACL/Firewall. 4. Cô lập sự cố (Fault Isolation). 5. Route Summarization.' }
);
