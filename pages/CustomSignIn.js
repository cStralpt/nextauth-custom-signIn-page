import { getProviders, getSession, signIn } from "next-auth/react";
import styles from "/styles/CustomSignIn.module.css";
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      providers: await getProviders(context),
    },
  };
}
const Login = (e) => {
  signIn(e.target.credentialsID.value, {
    username: e.target.username.value,
    password: e.target.password.value,
  });
};
function CustomSignIn({ providers }) {
  return (
    <div className={styles.container}>
      <form method="POST" onSubmit={Login} className={styles.CustomSignIn_form}>
        <input
          type="hidden"
          name="credentialsID"
          value={providers.credentials.id}
        />
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <span className={styles.btnContainer}>
          <button type="submit">Sign In</button>
        </span>
      </form>
    </div>
  );
}

export default CustomSignIn;
