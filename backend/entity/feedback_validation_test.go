package entity

import (
	"fmt"
	"testing"

	//"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestFeedbackCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Feedback", func(t *testing.T) {
		feedback := Feedback{

			Telephone_Number: "0980952581",
			FeedbackDetail:   "เปลี่ยนรหัสไม่ได้จ้า",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(feedback)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestTelephone_Number(t *testing.T) {
	g := NewGomegaWithT(t)
	fixtures := []string{
		"0000000000",  // เป็น 0
		"0200000000",  // ขึ้นต้นด้วย 0 ตามด้วย 2 และตามด้วย string 8 ตัว
		"090-0000000", // มีขีดคั่น
		"080000000",   // ขึ้นต้นด้วย 0 ตามด้วย 8 และตามด้วย string 7 ตัว
		"9912345678",  // ขึ้นต้นด้วย 9
		"090",         // ตัวอักษร 3 ตัว
		"0",           // ตัวอักษร 1 ตัว
	}

	for _, Telephone_Number := range fixtures {
		feedback := Feedback{

			Telephone_Number: Telephone_Number, //ผิด
			FeedbackDetail:   "เปลี่ยนรหัสไม่ได้จ้า",
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(feedback)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("กรอกเบอร์โทรไม่ถูกจ้า กรุณาใหม่ฮะ"))
	}
}

func TestTelephone_NumberNotbablank(t *testing.T) {
	g := NewGomegaWithT(t)

	feedback := Feedback{

		Telephone_Number: "", //ผิด
		FeedbackDetail:   "เปลี่ยนรหัสไม่ได้จ้า",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(feedback)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรอกเบอร์โทรด้วยจ้า"))

}

func TestFeedbackDetail(t *testing.T) {
	g := NewGomegaWithT(t)

	feedback := Feedback{

		Telephone_Number: "0980952581",
		FeedbackDetail:   "", //ผิด
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(feedback)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("บอกรายละเอียดมาก่อนกดบันทึกนะฮะ"))

}
