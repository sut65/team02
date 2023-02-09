package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestReportFictionValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	// ตรวจสอบ รายงานนิยาย ที่ถูกต้อง
	t.Run("Check ReportFiction correct", func(t *testing.T) {
		report := ReportFiction{
			ProblemFictionDetail: "เอารูปมาใช้โดย",
			PhoneNumber:          "0961345467",
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(report)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))
		fmt.Println(err)
	})

	// ตรวจสอบค่าว่างของรายละเอียดการรายงานนิยายแล้วต้องเจอ Error
	t.Run("Check ProblemFictionDetail blank", func(t *testing.T) {
		report := ReportFiction{
			ProblemFictionDetail: "",
			PhoneNumber:          "0961345467",
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(report)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
		g.Expect(ok).NotTo(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())
		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("กรุณาใส่รายละเอียดการรายงานนิยาย"))
	})

	// ตรวจสอบ รายละเอียดการรายงานนิยาย ต้องมีความยาวไม่เกิน 100 ตัวอักษรแล้วเจอ Error
	t.Run("Check ProblemFictionDetail max 100", func(t *testing.T) {
		report := ReportFiction{
			ProblemFictionDetail: "มีเนื้อหารุนแรงไม่เหมาะกับเด็กและอาจจะมีการเอาไปเลียนแบบได้ อาจทำให้กิการสูญเสียแบบไม่รู้ และมีการนำนิยายเรื่องอื่นๆทำรวมๆกัน",
			PhoneNumber:          "0961345467",
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(report)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รายละเอียดการรายงานนิยายต้องมีความยาวไม่เกิน 100 ตัวอักษร"))
	})

	// ตรวจสอบ รายละเอียดการรายงานนิยาย ต้องมีความยาวไม่ต่ำกว่า 5 ตัวอักษรแล้วเจอ Error
	t.Run("Check ProblemFictionDetail min 5", func(t *testing.T) {
		report := ReportFiction{
			ProblemFictionDetail: "ลอก",
			PhoneNumber:          "0961345467",
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(report)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("รายละเอียดการรายงานนิยายต้องมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"))
	})

	// ตรวจสอบค่าว่างของเบอร์ติดต่อแล้วต้องเจอ Error
	t.Run("Check PhoneNumber blank", func(t *testing.T) {
		report := ReportFiction{
			ProblemFictionDetail: "คัดลอกเรื่องอื่น",
			PhoneNumber:          "",
		}

		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(report)

		//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
		g.Expect(ok).NotTo(BeTrue())
		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())
		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("กรุณาระบุเบอร์ติดต่อ"))
	})

	// ตรวจสอบ เบอร์ติดต่อ 10 ตัว ขึ้นต้นด้วย 0 ตามด้วย 6,8,9 เท่านั้น แล้วต้องเจอ Error
	t.Run("Check PhoneNumber 10 digit Start 0 and followed by 6 or 8 or 9", func(t *testing.T) {

		fixtures := []string{
			"0000000000",  // เป็น 0
			"0200000000",  // ขึ้นต้นด้วย 0 ตามด้วย 2 และตามด้วย string 8 ตัว
			"090-0000000", // มีขีดคั่น
			"080000000",   // ขึ้นต้นด้วย 0 ตามด้วย 8 และตามด้วย string 7 ตัว
			"9912345678",  // ขึ้นต้นด้วย 9
			"090",         // ตัวอักษร 3 ตัว
			"0",           // ตัวอักษร 1 ตัว
		}

		for _, PhoneNumber := range fixtures {

			report := ReportFiction{
				ProblemFictionDetail: "คัดลอกเรื่องอื่น",
				PhoneNumber:          PhoneNumber,
			}

			// ตรวจสอบด้วย govalidator
			ok, err := govalidator.ValidateStruct(report)
			g.Expect(ok).ToNot(BeTrue())
			g.Expect(err).ToNot(BeNil())
			g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์ติดต่อที่ถูกต้อง"))
		}

	})
}
