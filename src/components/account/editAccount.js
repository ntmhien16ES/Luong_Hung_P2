import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as editAccountActions from "../../actions/account";
import { useTranslation } from "react-i18next";

const EditAccount = (props) => {
  const account = useSelector((state) => state.currentUser.account);
  const [editAccount, setEditAccount] = useState(account);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    setEditAccount(account);
  }, [account]);

  useEffect(() => {
    if (account) {
      setName(account[0].name);
      setPhone(account[0].phone);
      setRegion(account[0].region);
      setBirth(account[0].birth);
      setGender(account[0].gender);
    }
  }, [account]);

  const checkLogin = () => {
    if (!account) {
      props.history.push("/login");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let templ = editAccount[0];
    templ.name = name;
    templ.phone = phone;
    templ.region = region;
    templ.birth = birth;
    templ.gender = gender;
    templ.password = password;
    dispatch(editAccountActions.editAccount(templ));
    props.history.push("/");
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        return setName(event.target.value);
      case "phone":
        return setPhone(event.target.value);
      case "region":
        return setRegion(event.target.value);
      case "birth":
        return setBirth(event.target.value);
      case "gender":
        return setGender(event.target.value);
      case "password":
        return setPassword(event.target.value);
      default:
        return 0;
    }
  };

  const showEditAccount = () => {
    let result = [];
    result.push(
      <form className="register" onSubmit={handleSubmit}>
        {checkLogin}
        <label htmlFor="name">{t("auth.newName")}</label>
        <input
          name="name"
          placeholder={t("auth.newName")}
          type="text"
          id="name"
          value={name}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="password">{t("auth.newPassword")}</label>
        <input
          name="password"
          placeholder={t("auth.newPassword")}
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="phone">{t("auth.newPhone")}</label>
        <input
          name="phone"
          placeholder={t("auth.newPhone")}
          value={phone}
          type="text"
          id="phone"
          onChange={handleChange}
        />
        <br />

        <label htmlFor="region">{t("auth.newRegion")}</label>
        <input
          name="region"
          placeholder={t("auth.newRegion")}
          value={region}
          type="text"
          id="region"
          onChange={handleChange}
        />
        <br />

        <label htmlFor="birth">{t("auth.newDateOfBirth")}</label>
        <input
          name="birth"
          placeholder={t("auth.newDateOfBirth")}
          value={birth}
          type="date"
          id="birth"
          onChange={handleChange}
        />
        <br />

        <label htmlFor="Male">{t("auth.newGender")}</label>
        <label htmlFor="Male" className="gender">
          <input
            name="gender"
            type="radio"
            value="Male"
            id="Male"
            checked={gender === "Male"}
            onChange={handleChange}
          />{" "}
          {t("auth.male")}
        </label>
        <br />
        <label htmlFor="Female" className="gender">
          <input
            name="gender"
            type="radio"
            value="Female"
            id="Female"
            checked={gender === "Female"}
            onChange={handleChange}
          />{" "}
          {t("auth.female")}
        </label>
        <br />

        <input type="submit" value={t("auth.editAccount")} />
      </form>
    );
    return result;
  };

  return <div>{account ? showEditAccount() : checkLogin()}</div>;
};

export default EditAccount;
