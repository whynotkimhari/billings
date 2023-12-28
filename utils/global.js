import { toStr } from "./yearViewTools"

export let language = "vn"

export const changeLanguage = (newLanguage) => {
    language = newLanguage
}

export const dictionary = {
    vn: {
        // Navigation Component
        nav_link_1: 'Dữ liệu mẫu',
        nav_link_2: 'Xem hồ sơ',
        nav_link_3: 'Tạo hoá đơn',
        nav_button_1: 'Đăng xuất',
        nav_button_2: 'Đăng nhập',

        // Profile Component
        profile_h1: (name) => `Hồ sơ của ${name}`,
        profile_h2: (rate) => `Tỉ giá hôm nay: 1 forint = ${rate} vnd`,

        // YearView Component
        yearview_h1: (month, year) => `Tháng ${month} năm ${year}`,
        yearview_li_1: (shoppingTimes) => `Đã đi chợ ${shoppingTimes} lần`,
        yearview_li_2: (totalSpending) => `Tổng chi tiêu ${totalSpending} forint`,
        yearview_li_3: (vnd) => `Khoảng ${vnd} vnd`,
        yearview_li_4: (m, y) => `Xem chi tiết tháng ${m}/${y}`,

        // detail-view/page.jsx
        detailview_h1: (month, year) => `Chi tiết tháng ${month} năm ${year}`,
        detailview_h2: (huf, vnd) => `Tổng tháng: ${huf} huf ~ ${vnd} vnd`,

        // MonthView Component
        monthview_li_1: (sum) => `Tổng cộng: ${sum} forint`,
        monthview_li_2: (vnd) => `Khoảng: ${vnd} vnd`,

        // dataset tile month view
        monthview_title: (month, year) => `Chi tiêu tháng ${month} năm ${year}`,

        // main chart tile
        mainchart_title: (id, year) => id ? `Chi tiêu của bạn năm ${year}` : "Đây là dữ liệu mẫu",
        mainchart_label: (month) => `Tháng ${month}`,
        mainchart_data_label_1: 'Số lần đi chợ',
        mainchart_data_label_2: 'Tổng số tiền đã dùng (HUF)',

        // Form Component
        form_h1_1: (isEdit) => `${isEdit ? "Chỉnh sửa" : "Tạo mới"} hoá đơn`,
        form_p_1: (isEdit) => `Hãy ${isEdit ? "chỉnh sửa" : "tạo mới"} hoá đơn của bạn`,
        form_main_label: 'Hoá đơn của bạn',
        form_date: (date) => `Ngày: ${date}`,
        form_item_name: 'Tên vật phẩm:',
        form_item_price: 'Giá trị:',
        form_item_quantity: 'Số lượng:',
        
        form_h1_2: 'Vật phẩm',
        form_p_2: 'Xem lại các vật phẩm đã được thêm vào',

        form_item_name_phd: 'Nhập tên sản phẩm ở đây',
        form_item_price_phd: 'Nhập giá tiền ở đây',
        form_item_quantity_phd: 'Nhập số lượng ở đây',

        form_add_btn: 'Thêm',
        form_save_btn: 'Lưu',
        form_edit_btn: 'Sửa',
        form_delete_btn: 'Xoá',

        // Error Messages
        err_not_login: 'Bạn cần đăng nhập để vào trang này!',
        err_no_activity: 'Bạn chưa nhập dữ liệu lần nào!',
        err_empty_field: "Bạn hãy điền tất cả các trường!",
    },
    en: {
        // Navigation Component
        nav_link_1: 'Fake data',
        nav_link_2: 'Profile',
        nav_link_3: 'Create billing',
        nav_button_1: 'Sign Out',
        nav_button_2: 'Sign In',

        // Profile Component
        profile_h1: (name) => `${name}'s profile`,
        profile_h2: (rate) => `Today rate: 1 forint = ${rate} vnd`,

        // YearView Component
        yearview_h1: (month, year) => `${toStr(month)}, ${year}`,
        yearview_li_1: (shoppingTimes) => `Went shopping: ${shoppingTimes} times`,
        yearview_li_2: (totalSpending) => `Total spending: ${totalSpending} forint`,
        yearview_li_3: (vnd) => `Approximately: ${vnd} vnd`,
        yearview_li_4: (m, y) => `View details: ${m}/${y}`,

        // detail-view/page.jsx
        detailview_h1: (month, year) => `Detailed billings in ${toStr(month)} ${year}`,
        detailview_h2: (huf, vnd) => `Total spending: ${huf} huf ~ ${vnd} vnd`,

        // MonthView Component
        monthview_li_1: (sum) => `Total: ${sum} forint`,
        monthview_li_2: (vnd) => `Apprx: ${vnd} vnd`,

        // dataset title month view
        monthview_title: (month, year) => `Spending in ${toStr(month)}, ${year}`,

        // main chart title
        mainchart_title: (id, year) => id ? `Your activity in ${year}` : "THIS IS A FAKE DATA!",
        mainchart_label: (month) => toStr(month),
        mainchart_data_label_1: 'Shopping times',
        mainchart_data_label_2: 'Total spending (HUF)',

        // Form Component
        form_h1_1: (isEdit) => `${isEdit ? "Edit" : "Create"} Billing`,
        form_p_1: (isEdit) => `Let's ${isEdit ? "edit" : "create"} your${isEdit ? "" : " new"} billing`,
        form_main_label: 'Your Billing',
        form_date: (date = "") => `Date: ${date}`,
        form_item_name: 'Item name:',
        form_item_price: 'Item price:',
        form_item_quantity: 'Item quantity:',

        form_h1_2: 'Items',
        form_p_2: 'View your added items',

        form_item_name_phd: 'Your item name here',
        form_item_price_phd: 'Your item price here',
        form_item_quantity_phd: 'Your item quantity here',

        form_add_btn: 'Add',
        form_save_btn: 'Save',
        form_edit_btn: 'Edit',
        form_delete_btn: 'Delete',

        // Error Messages
        err_not_login: 'Please log in before trying to reach this page!',
        err_no_activity: 'You do not have any activity yet!',
        err_empty_field: "Please fill out all the box!",
    }
}