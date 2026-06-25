import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * Beauty & Style - Ứng dụng tư vấn làm đẹp (console).
 *
 * Hỏi nhu cầu của khách hàng rồi gợi ý dịch vụ phù hợp,
 * kèm link kết nối TikTok và Facebook.
 *
 * Biên dịch:  javac BeautyStyle.java
 * Chạy:       java BeautyStyle
 */
public class BeautyStyle {

    static final String TIKTOK   = "https://www.tiktok.com/@beauty.style15";
    static final String FACEBOOK = "https://www.facebook.com/share/18p4jHNtHT/";

    static final String GOLD  = "[33m";
    static final String PINK  = "[95m";
    static final String CYAN  = "[96m";
    static final String DIM   = "[90m";
    static final String BOLD  = "[1m";
    static final String RESET = "[0m";

    static final Scanner in = new Scanner(System.in, StandardCharsets.UTF_8);

    public static void main(String[] args) {
        // Đảm bảo tiếng Việt & emoji hiển thị đúng trên mọi nền tảng.
        System.setOut(new PrintStream(System.out, true, StandardCharsets.UTF_8));
        banner();
        boolean running = true;
        while (running) {
            mainMenu();
            String choice = prompt("Mời bạn chọn (1-3): ").trim();
            switch (choice) {
                case "1": consult();        break;
                case "2": showConnect();    break;
                case "3": running = false;  break;
                default:  warn("Lựa chọn không hợp lệ, vui lòng nhập 1, 2 hoặc 3.");
            }
        }
        System.out.println();
        System.out.println(GOLD + "  ✦ Cảm ơn bạn đã ghé Beauty & Style. Chúc bạn luôn xinh đẹp & tỏa sáng! ✦" + RESET);
        System.out.println();
    }

    /* ----------------------------------------------------------------- */
    /*  Giao diện                                                        */
    /* ----------------------------------------------------------------- */

    static void banner() {
        System.out.println();
        System.out.println(GOLD + "  ╔══════════════════════════════════════════════════╗" + RESET);
        System.out.println(GOLD + "  ║" + RESET + BOLD + "            B E A U T Y   " + PINK + "&" + RESET + BOLD + "   S T Y L E            " + GOLD + "║" + RESET);
        System.out.println(GOLD + "  ║" + RESET + PINK  + "             Tỏa sáng vẻ đẹp của bạn               " + GOLD + "║" + RESET);
        System.out.println(GOLD + "  ╚══════════════════════════════════════════════════╝" + RESET);
    }

    static void mainMenu() {
        System.out.println();
        System.out.println(BOLD + "  ─── MENU CHÍNH ───" + RESET);
        System.out.println("   " + GOLD + "1." + RESET + " 💄 Tư vấn làm đẹp");
        System.out.println("   " + GOLD + "2." + RESET + " 🔗 Kết nối với chúng tôi (TikTok / Facebook)");
        System.out.println("   " + GOLD + "3." + RESET + " 🚪 Thoát");
    }

    /* ----------------------------------------------------------------- */
    /*  Tư vấn làm đẹp                                                   */
    /* ----------------------------------------------------------------- */

    static void consult() {
        System.out.println();
        System.out.println(CYAN + "  Chào bạn! Mình là trợ lý tư vấn của Beauty & Style 💖" + RESET);
        String name = prompt("  Cho mình biết tên của bạn nhé: ").trim();
        if (name.isEmpty()) name = "bạn";

        System.out.println();
        System.out.println("  Rất vui được tư vấn cho " + BOLD + name + RESET + "! Bạn đang quan tâm đến điều gì?");
        System.out.println("   " + GOLD + "1." + RESET + " Chăm sóc da mặt");
        System.out.println("   " + GOLD + "2." + RESET + " Tóc & tạo kiểu");
        System.out.println("   " + GOLD + "3." + RESET + " Trang điểm");
        System.out.println("   " + GOLD + "4." + RESET + " Nail (móng tay/chân)");
        System.out.println("   " + GOLD + "5." + RESET + " Mi & chân mày");
        String c = prompt("  Lựa chọn của bạn (1-5): ").trim();

        List<String> goi = new ArrayList<>();
        switch (c) {
            case "1": goi = tuVanDa();      break;
            case "2": goi = tuVanToc();     break;
            case "3": goi = tuVanMakeup();  break;
            case "4": goi = tuVanNail();    break;
            case "5": goi = tuVanMiMay();   break;
            default:
                warn("Mình chưa nhận ra lựa chọn này, nhưng đừng lo nhé!");
                goi.add("Gặp trực tiếp chuyên viên để được tư vấn tổng quát");
        }

        System.out.println();
        System.out.println(PINK + "  ✨ Gợi ý dành riêng cho " + name + ":" + RESET);
        int i = 1;
        for (String g : goi) {
            System.out.println("     " + GOLD + i++ + "." + RESET + " " + g);
        }
        System.out.println();
        System.out.println(DIM + "  Để đặt lịch hoặc tư vấn chi tiết hơn, hãy nhắn cho tụi mình qua:" + RESET);
        System.out.println("     🎵 TikTok :  " + CYAN + TIKTOK + RESET);
        System.out.println("     📘 Facebook: " + CYAN + FACEBOOK + RESET);
    }

    static List<String> tuVanDa() {
        System.out.println();
        System.out.println("  Tình trạng da của bạn hiện tại là?");
        System.out.println("   1. Da khô        2. Da dầu/mụn       3. Da lão hóa       4. Da xỉn màu");
        String d = prompt("  Chọn (1-4): ").trim();
        List<String> r = new ArrayList<>();
        switch (d) {
            case "1":
                r.add("Liệu trình cấp ẩm chuyên sâu Hydra Facial");
                r.add("Massage mặt + đắp mặt nạ collagen");
                break;
            case "2":
                r.add("Liệu trình lấy nhân mụn chuẩn y khoa");
                r.add("Peel da nhẹ kiểm soát dầu & se khít lỗ chân lông");
                break;
            case "3":
                r.add("Liệu trình nâng cơ - trẻ hóa da RF");
                r.add("Điện di tinh chất vitamin C chống lão hóa");
                break;
            case "4":
                r.add("Liệu trình dưỡng trắng da Brightening");
                r.add("Tẩy tế bào chết + đắp mặt nạ làm sáng");
                break;
            default:
                r.add("Soi da miễn phí để xác định liệu trình phù hợp");
        }
        r.add("Tư vấn routine chăm sóc da tại nhà");
        return r;
    }

    static List<String> tuVanToc() {
        System.out.println();
        System.out.println("  Bạn muốn làm gì với mái tóc?");
        System.out.println("   1. Cắt/tạo kiểu   2. Nhuộm màu        3. Uốn/duỗi        4. Phục hồi hư tổn");
        String d = prompt("  Chọn (1-4): ").trim();
        List<String> r = new ArrayList<>();
        switch (d) {
            case "1": r.add("Cắt + tạo kiểu theo gương mặt"); r.add("Gội dưỡng & sấy tạo phồng"); break;
            case "2": r.add("Nhuộm thời trang / phủ bạc"); r.add("Tư vấn bảng màu hợp tông da"); break;
            case "3": r.add("Uốn/duỗi setting giữ nếp lâu"); r.add("Hấp dầu bảo vệ tóc sau hóa chất"); break;
            case "4": r.add("Hấp phục hồi keratin chuyên sâu"); r.add("Liệu trình dưỡng tóc bóng mượt"); break;
            default:  r.add("Tư vấn kiểu tóc & chăm sóc tổng quát");
        }
        return r;
    }

    static List<String> tuVanMakeup() {
        System.out.println();
        System.out.println("  Bạn cần trang điểm cho dịp nào?");
        System.out.println("   1. Đi làm/hằng ngày  2. Dự tiệc       3. Cô dâu          4. Chụp ảnh/sự kiện");
        String d = prompt("  Chọn (1-4): ").trim();
        List<String> r = new ArrayList<>();
        switch (d) {
            case "1": r.add("Makeup nhẹ nhàng tự nhiên (daily look)"); break;
            case "2": r.add("Makeup dự tiệc sang trọng, tông lì lâu trôi"); break;
            case "3": r.add("Gói makeup cô dâu trọn gói + thử trước"); break;
            case "4": r.add("Makeup sắc nét chuẩn ăn đèn cho máy ảnh"); break;
            default:  r.add("Tư vấn phong cách makeup phù hợp");
        }
        r.add("Hướng dẫn kỹ thuật makeup cơ bản tại nhà");
        return r;
    }

    static List<String> tuVanNail() {
        List<String> r = new ArrayList<>();
        r.add("Sơn gel bền màu + chăm sóc da tay/chân");
        r.add("Vẽ nghệ thuật / đính đá theo yêu cầu");
        r.add("Đắp bột / kéo dài móng tạo dáng");
        return r;
    }

    static List<String> tuVanMiMay() {
        List<String> r = new ArrayList<>();
        r.add("Nối mi tự nhiên / classic / volume");
        r.add("Phun/điêu khắc chân mày tạo dáng chuẩn tỉ lệ");
        r.add("Uốn & nhuộm mi giữ nếp cong tự nhiên");
        return r;
    }

    /* ----------------------------------------------------------------- */
    /*  Kết nối                                                          */
    /* ----------------------------------------------------------------- */

    static void showConnect() {
        System.out.println();
        System.out.println(PINK + "  ─── KẾT NỐI VỚI BEAUTY & STYLE ───" + RESET);
        System.out.println("   🎵 TikTok  : " + CYAN + TIKTOK + RESET + DIM + "  (@beauty.style15)" + RESET);
        System.out.println("   📘 Facebook: " + CYAN + FACEBOOK + RESET);
        System.out.println();
        System.out.println(DIM + "   Theo dõi để cập nhật xu hướng làm đẹp & ưu đãi mới nhất nhé!" + RESET);
    }

    /* ----------------------------------------------------------------- */
    /*  Tiện ích                                                         */
    /* ----------------------------------------------------------------- */

    static String prompt(String msg) {
        System.out.print(msg);
        return in.hasNextLine() ? in.nextLine() : "";
    }

    static void warn(String msg) {
        System.out.println(PINK + "  ⚠ " + msg + RESET);
    }
}
