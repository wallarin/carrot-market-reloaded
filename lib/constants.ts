export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
    /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
)
export const PASSWORD_REGEX_ERROR = "비밀번호는 소문자, 숫자, 특수문자를 포함해야합니다.";