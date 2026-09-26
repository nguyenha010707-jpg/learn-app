# Ứng Dụng Ôn Luyện Mạng Máy Tính (Computer Networking)

Ứng dụng web ôn tập tương tác, hỗ trợ cả **Trắc nghiệm**, **Tự luận (quét từ khóa thông minh)** và **Flashcard**, được xây dựng dựa trên 3 slide bài giảng:
1. **Chuyên đề 1: Tầng Physical & Cáp truyền dẫn**: Cáp xoắn đôi UTP/STP, Cat5e/Cat6/Cat6A, Cáp quang SMF/MMF, Đầu nối RJ45, LC, SC, ST, FC, Thiết bị ODF, SFP/SFP+, Media Converter, Patch Panel.
2. **Chuyên đề 2: Tầng Data Link, Ethernet & Switch**: Địa chỉ MAC (48 bit), Khung Ethernet II (Dest/Src MAC, EtherType 0x0800, 0x0806, FCS), CSMA/CD, Half-Duplex vs Full-Duplex, Collision Domain (Hub vs Switch), Quy tắc học Source MAC của Switch, 3 hành vi (Forward, Filter, Flood), Dynamic vs Static MAC.
3. **Chuyên đề 3: Giao thức ARP & Định tuyến mạng**: Ánh xạ IPv4 sang MAC, ARP Request (Broadcast) & ARP Reply (Unicast), Bảng nhớ đệm ARP Cache (`arp -a`, `arp -d *`), Khác Subnet & Default Gateway (Router), Quy trình kết nối Wi-Fi & DHCP (DORA), Luồng gói tin Ping ICMP, Nguyên tắc bảo tồn IP (Layer 3) và biến đổi MAC (Layer 2) qua từng chặng Router (Hop-by-hop).
4. **Chuyên đề 4: Nội dung mở rộng (Chừa sẵn để bạn nạp file thứ 4)**.

---

## 🚀 Cách Mở Ứng Dụng
1. Click đúp vào file `run_app.bat` hoặc mở trực tiếp file `index.html` bằng bất kỳ trình duyệt nào (Chrome, Edge, Cốc Cốc, Firefox...).
2. Không cần cài đặt bất kỳ phần mềm hay thư viện nào! Ứng dụng chạy hoàn toàn offline và tự động lưu tiến độ vào trình duyệt (`localStorage`).

---

## 📌 Các Tính Năng Chính

### 1. Trắc Nghiệm (Quiz Mode)
- **Hơn 30 câu hỏi trọng tâm** biên soạn chi tiết theo sát nội dung slide.
- **2 Chế độ:**
  - *Luyện tập:* Xem kết quả đúng/sai và lời giải thích chi tiết ngay sau khi chọn đáp án.
  - *Thi thử:* Làm bài có tính giờ, nộp bài tính điểm tổng kết và xem lại các câu làm sai.
- **Bộ lọc chuyên đề:** Ôn từng chuyên đề riêng biệt hoặc ôn tổng hợp.
- **Xáo trộn:** Đảo ngẫu nhiên thứ tự câu hỏi và thứ tự đáp án A-B-C-D.

### 2. Tự Luận & Quét Từ Khóa (Essay Mode)
- Đưa ra các câu hỏi tình huống thực tế và kịch bản mạng chuyên sâu.
- Học viên nhập câu trả lời vào ô soạn thảo.
- **Tính năng đặc biệt - Quét Từ Khóa Cốt Lõi:**
  - Hệ thống tự động phân tích bài viết của bạn để tìm các từ khóa quan trọng.
  - Hiển thị danh sách từ khóa đã có (màu xanh) và từ khóa còn thiếu (màu đỏ).
  - Tính tỷ lệ phần trăm từ khóa đạt được.
  - Cung cấp đáp án mẫu chi tiết có cấu trúc rõ ràng.
  - Thang điểm tự đánh giá (Rubric 1 - 10 điểm) lưu lại tiến độ học tập.

### 3. Thẻ Ghi Nhớ (Flashcard)
- Lật thẻ 3D trực quan để ôn nhanh các định nghĩa, thuật ngữ và thông số kỹ thuật.

### 4. Chức Năng Nạp Nội Dung Bổ Sung (File Thứ 4)
- Nằm riêng ở tab **"4. Thêm Nội Dung (File 4)"**:
  - **Cách 1 - Form trực quan:** Nhập câu hỏi, 4 phương án, đáp án đúng và giải thích (hoặc câu tự luận kèm từ khóa).
  - **Cách 2 - Dán nhanh văn bản (Bulk text parser):** Copy/dán nhiều câu hỏi dạng text cùng lúc, hệ thống sẽ tự động bóc tách và thêm vào ngân hàng đề.
  - **Cách 3 - Xuất / Nhập file JSON:** Sao lưu dữ liệu ra file `.json` hoặc nhập từ file khác.
  - Có sẵn nút **"Nạp câu hỏi mẫu File 4"** để bạn trải nghiệm thử ngay lập tức.
