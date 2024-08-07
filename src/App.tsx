import { useForm } from "react-hook-form";
import "./App.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

// Тип для формы
interface UserInput {
  fullName: string;
  food: string;
  flag: boolean;
}

interface UserInput2 {
  fullName: string;
  cloth: string;
  flag: boolean;
}

// Дефолтные значения для формы
const defaultValues: UserInput = {
  fullName: "Кек Кекович",
  food: "",
  flag: true,
};

const defaultValues2: UserInput2 = {
  fullName: "Кек Кекович",
  cloth: "",
  flag: true,
};

// Правила проверки из библиотеки yup
const validationSchema = yup.object({
  fullName: yup
      .string()
      .required("Обязательное поле")
      .min(2, "Имя должно содержать 2-100 симовлов")
      .max(100, "Имя должно содержать 2-100 симовлов"),
  food: yup
      .string()
      .required("Выберите еду"),
  flag: yup
      .boolean()
      .isTrue("Вы должны согласиться")
      .required("Требуется одобрение"),
});

// Правила проверки из библиотеки yup
const validationSchema2 = yup.object({
  fullName: yup
      .string()
      .required("Обязательное поле")
      .min(2, "Имя должно содержать 2-100 симовлов")
      .max(100, "Имя должно содержать 2-100 симовлов"),
  cloth: yup
      .string()
      .required("Выберите одежду"),
  flag: yup
      .boolean()
      .isTrue("Вы должны согласиться")
      .required("Требуется одобрение"),
});

function App() {
  const {
    // Зарегистрировать элемент - позволяет зарегистрировать элемент и применить соответствующие правила проверки.
    register,
    // Обработка формы отправки - получит данные формы, если проверка прошла успешно
    handleSubmit,
    // Ошибки формы - показываает ошибки
    formState: { errors },
    // Сбор полей до пустых или дефолнтных
    reset,
    //useForm - хук из react-hook-form
  } = useForm<UserInput>({
    // Дефолтные значения для формы
    defaultValues,
    // Мод, который врубает onChanage (дейтсиве на отпраку) и onBlur (действие на изменение формы)
    mode: "all",
    //костыль в виде any???
    resolver: yupResolver<any>(validationSchema, undefined, {raw: true}),
  });

  const {
    // Зарегистрировать элемент - позволяет зарегистрировать элемент и применить соответствующие правила проверки.
    register: register2,
    // Обработка формы отправки - получит данные формы, если проверка прошла успешно
    handleSubmit: handleSubmit2,
    // Ошибки формы - показываает ошибки
    formState: { errors: errors2 },
    // Сбор полей до пустых или дефолнтных
    reset: reset2,
    //useForm - хук из react-hook-form
  } = useForm<UserInput2>({
    // Дефолтные значения для формы
    defaultValues: defaultValues2,
    // Мод, который врубает onChanage (дейтсиве на отпраку) и onBlur (действие на изменение формы)
    mode: "all",
    //костыль в виде any???
    resolver: yupResolver<any>(validationSchema2, undefined, {raw: true}),
  });

  const onSubmitHandler = (values: UserInput) => {
    console.log(`Submitted`);
    console.log({values});
    reset();
  };

  const onSubmitHandler2 = (values: UserInput2) => {
    console.log(`Submitted 2`);
    console.log({values});
    reset2();
  };

  return (
      <Container>
        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Форма заказа еды</Card.Title>
                <Form onSubmit={handleSubmit(onSubmitHandler)}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="fullName">Имя</Form.Label>
                    <Form.Control {...register("fullName")} id="fullName" type="text" />
                    {errors.fullName && (
                        <p style={{color: "red"}}>{errors.fullName.message}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="food">Выбор еды</Form.Label>
                    <Form.Select {...register("food")} id="food">
                      <option value="" disabled>
                        Выберите...
                      </option>
                      <option value="pizza">Пицца</option>
                      <option value="burger">Бургер</option>
                      <option value="ice-cream">Ролл</option>
                    </Form.Select>            {errors.food && (
                      <p style={{color: "red"}}>{errors.food.message}</p>
                  )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                        {...register("flag")}
                        id="flag"
                        type="checkbox"
                        label="Вы согласны заказать?"
                    />
                    {errors.flag && (
                        <p style={{color: "red"}}>{errors.flag.message}</p>
                    )}
                  </Form.Group>

                  <Button variant="primary" type="submit">Заказать</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Форма заказа одежды</Card.Title>
                <Form onSubmit={handleSubmit2(onSubmitHandler2)}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="fullName2">Имя</Form.Label>
                    <Form.Control {...register2("fullName")} id="fullName2" type="text" />
                    {errors2.fullName && (
                        <p style={{color: "red"}}>{errors2.fullName.message}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="cloth">Выбор одежды</Form.Label>
                    <Form.Select {...register2("cloth")} id="cloth">
                      <option value="" disabled>
                        Выберите...
                      </option>
                      <option value="coat">Пальто</option>
                      <option value="jeans">Джинсы</option>
                      <option value="mittens">Рукавицы</option>
                    </Form.Select>
                    {errors2.cloth && (
                        <p style={{color: "red"}}>{errors2.cloth.message}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                        {...register2("flag")}
                        id="flag2"
                        type="checkbox"
                        label="Вы согласны заказать?"
                    />
                    {errors2.flag && (
                        <p style={{color: "red"}}>{errors2.flag.message}</p>
                    )}
                  </Form.Group>

                  <Button variant="primary" type="submit">Заказать</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default App;
