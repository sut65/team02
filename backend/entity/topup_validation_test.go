package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestTopUpCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format TopUp", func(t *testing.T) {
		top_up := TopUp{

			Topup_phone_number: "0987654321",
			Note:               "เติม",
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(top_up)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestTopUpPhoneNumber(t *testing.T) {
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

	for _, Topup_phone_number := range fixtures {
		top_up := TopUp{

			Topup_phone_number: Topup_phone_number,
			Note:               "เติมเพื่อซื้อนิยายเรื่อง dear",
		}
		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(top_up)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("กรอกเบอร์โทรศัพมือถือไม่ถูกต้อง"))
	}
}

func TestTopUpPhoneNumberNotbeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	top_up := TopUp{

		Topup_phone_number: "",
		Note:               "เติมเพื่อซื้อนิยายเรื่อง dear",
	} //ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(top_up)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทรศัพมือถือที่ติดต่อได้"))

}

func TestTopUpNoteMax100(t *testing.T) {
	g := NewGomegaWithT(t)

	top_up := TopUp{

		Topup_phone_number: "0983589647",
		Note:               "เติมเพื่อซื้อนิยายเรื่อง dear เติมเพื่อซื้อนิยายเรื่อง dear เติมเพื่อซื้อนิยายเรื่อง dear เติมเพื่อซื้อนิยายเรื่อง dear ",
	} //ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(top_up)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกบันทึกช่วยจำสั้นกว่านี้"))

}
