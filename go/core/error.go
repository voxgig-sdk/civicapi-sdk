package core

type CivicapiError struct {
	IsCivicapiError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCivicapiError(code string, msg string, ctx *Context) *CivicapiError {
	return &CivicapiError{
		IsCivicapiError: true,
		Sdk:              "Civicapi",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CivicapiError) Error() string {
	return e.Msg
}
