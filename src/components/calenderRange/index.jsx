import "dayjs/locale/fa";
import locale from "antd/locale/fa_IR";

import { DatePicker, Form } from "antd";
import { useTranslation } from "react-i18next";

const CalenderDatePicker = ({ required = false, initialValue = null, extraClasses = "" }) => {
    const { t } = useTranslation();
    const rules = [
        {
            required: required,
            message: t("schemas.required"),
        },
    ];
    return (
        <Form.Item
            labelCol={{ xs: 24 }}
            wrapperCol={{ xs: 24 }}
            className={extraClasses}
            label={"انتخاب بازه زمانی :"}
            name={"dateRange"}
            initialValue={initialValue}
            rules={rules}
        >
            <DatePicker.RangePicker
                style={{ width: '100%' }}
                placement="bottomLeft"
                locale={locale}
            />
        </Form.Item>
    );
};

export default CalenderDatePicker;
