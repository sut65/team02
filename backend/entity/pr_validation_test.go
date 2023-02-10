package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPrCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format PR", func(t *testing.T) {

		pr := Public_Relation{
			Pr_topic:   "นวนิยายออกใหม่มาแรงกับ even better.",
			Pr_details: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(pr)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestPrTopicNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	pr := Public_Relation{
		Pr_topic:   "", //wrong
		Pr_details: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
	}

	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(pr)

	//ok ต้องไม่เป็นค่า true แปลว่าต้องจับ err ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาเพิ่มหัวข้อเรื่อง"))

}

func TestPrDetailsNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	pr := Public_Relation{
		Pr_topic:   "นวนิยายออกใหม่มาแรงกับ even better.",
		Pr_details: "", //wrong
	}

	ok, err := govalidator.ValidateStruct(pr)

	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกรายละเอียดเกี่ยวกับนวนิยาย"))

}

func TestPrDetailsMIN(t *testing.T) {
	g := NewGomegaWithT(t)

	pr := Public_Relation{
		Pr_topic:   "นวนิยายออกใหม่มาแรงกับ even better.",
		Pr_details: "bb", //wrong //min=3
	}

	ok, err := govalidator.ValidateStruct(pr)

	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณาเพิ่มรายละเอียดเกี่ยวกับนวนิยาย"))

}

func TestPrDetailsMAX(t *testing.T) {
	g := NewGomegaWithT(t)

	pr := Public_Relation{
		Pr_topic:   "นวนิยายออกใหม่มาแรงกับ even better.",
		Pr_details: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", //wrong
	}
	//ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(pr)

	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรอกรายละเอียดเกิน!"))

}
