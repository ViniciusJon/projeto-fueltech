import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Carrinho from './components/src/Carrinho';
import EsqueciSenha from './components/src/EsqueciSenha';
import CriarConta from './components/src/CriarConta';
import { useNavigation } from '@react-navigation/native';
import { produtosData } from './components/src/ProdutosData';
import { servicosData } from './components/src/ServicosData';
import Mapa from './components/src/Mapa';
import AgendarServico from './components/src/AgendarServico';

const Produtos = () => {
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState(produtosData);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigateToMapa = () => {
    navigation.navigate('Mapa');
  };

  const apertarBotao = (boxItem) => {
    Alert.alert(boxItem.nome, boxItem.descricao, [
      {
        text: 'Adicionar no Carrinho',
        onPress: () => {
          setProdutosSelecionados((prevProdutosSelecionados) => [
            ...prevProdutosSelecionados,
            boxItem,
          ]);
        },
      },
      {
        text: 'Voltar',
        onPress: () => console.log('Botão Cancelar pressionado'),
      },
    ]);
  };

  const navigateToCarrinho = () => {
    console.log('produtosSelecionados:', produtosSelecionados);
    navigation.navigate('Carrinho', { produtosSelecionados });
  };

  const filteredProducts = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://images.hdqwalls.com/download/dodge-challenger-rt-at-neon-gas-station-zs-1080x1920.jpg',
      }}
      style={styles.backgroundImage}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Produtos</Text>
          </View>
          <TouchableOpacity style={styles.mapButton} onPress={navigateToMapa}>
            <Text style={styles.mapButtonText}>
              Encontre o nosso parceiro mais perto de você
            </Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={24}
              color="white"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar produtos..."
              placeholderTextColor="white"
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>

          <FlatList
            numColumns={2}
            keyExtractor={(item) => item.nome}
            data={filteredProducts}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => apertarBotao(item)}>
                <View style={styles.boxItem}>
                  <Image
                    source={{ uri: item.imagem }}
                    style={styles.productImage}
                  />
                  <Text style={styles.itemText}>{item.nome}</Text>
                </View>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            style={styles.carrinhoButton}
            onPress={navigateToCarrinho}>
            <Text style={styles.carrinhoButtonText}>
              {' '}
              Ver Carrinho dos Produtos{' '}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.carrinhoButton}
            onPress={() => navigation.navigate('Servicos')}>
            <Text style={styles.carrinhoButtonText}>
              {' '}
              Ver Nossos Serviços Oferecidos{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const Servicos = () => {
  const navigation = useNavigation();
  const [servicos, setServicos] = useState(servicosData);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigateToMapa = () => {
    navigation.navigate('Mapa');
  };
  const apertarBotaoServico = (servicoItem) => {
    Alert.alert(servicoItem.nome, servicoItem.descricao, [
      {
        text: 'Adicionar no Carrinho',
        onPress: () => {
          setServicosSelecionados((prevServicosSelecionados) => [
            ...prevServicosSelecionados,
            { ...servicoItem, quantidade: 1 },
          ]);
        },
      },
      {
        text: 'Voltar',
        onPress: () => console.log('Botão Cancelar pressionado'),
      },
    ]);
  };

  const navigateToCarrinhoServicos = () => {
    console.log('servicosSelecionados:', servicosSelecionados);
    navigation.navigate('Carrinho', { servicosSelecionados });
  };

  const filteredServicos = servicos.filter((servico) =>
    servico.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigateToAgendarServico = () => {
    navigation.navigate('AgendarServico');
  };
  return (
    <ImageBackground
      source={{
        uri: 'https://images.hdqwalls.com/download/dodge-challenger-rt-at-neon-gas-station-zs-1080x1920.jpg',
      }}
      style={styles.backgroundImage}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Serviços</Text>
          </View>
          <TouchableOpacity style={styles.mapButton} onPress={navigateToMapa}>
            <Text style={styles.mapButtonText}>
              Encontre o nosso parceiro mais perto de você
            </Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={24}
              color="white"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar serviços..."
              placeholderTextColor="white"
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.agendarButton}
            onPress={navigateToAgendarServico}>
            <Text style={styles.agendarButtonText}> Agendar Serviço </Text>
          </TouchableOpacity>
          <FlatList
            numColumns={2}
            keyExtractor={(item) => item.nome}
            data={filteredServicos}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => apertarBotaoServico(item)}>
                <View style={styles.boxItem}>
                  <Image
                    source={{ uri: item.imagem }}
                    style={styles.productImage}
                  />
                  <Text style={styles.itemText}>{item.nome}</Text>
                </View>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            style={styles.carrinhoButton}
            onPress={navigateToCarrinhoServicos}>
            <Text style={styles.carrinhoButtonText}>
              {' '}
              Ver Carrinho de Serviços{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const Stack = createNativeStackNavigator();

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginErro, setLoginErro] = useState(false);

  const onPressAcessar = () => {
    if (email === 'fueltech@hotmail.com' && senha === '1234') {
      setLoginErro(false);
      navigation.navigate('Produtos');
    } else {
      setLoginErro(true);
    }
  };

  const onPressEsqueceuASenha = () => {
    navigation.navigate('EsqueciSenha');
  };

  const onPressCadastrar = () => {
    navigation.navigate('CriarConta');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.hdqwalls.com/download/dodge-challenger-rt-at-neon-gas-station-zs-1080x1920.jpg',
      }}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        {loginErro && (
          <Text style={{ color: '#ff5e00', marginTop: 10 }}>
            Usuário ou senha incorretos. Tente novamente.
          </Text>
        )}
        <ImageBackground
          source={{
            uri: 'https://images.hdqwalls.com/download/dodge-challenger-rt-at-neon-gas-station-zs-1080x1920.jpg',
          }}
          resizeMode="cover"
          style={styles.imagem}></ImageBackground>
        <Text style={styles.titles}> FuelTech </Text>

        <View style={styles.inputView}>
          <MaterialCommunityIcons name="fuel" size={26} color="#ff5e00" />
          <TextInput
            style={styles.inputText}
            placeholder="E-mail"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputView}>
          <MaterialIcons name="local-gas-station" size={26} color="#ff5e00" />
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Senha"
            placeholderTextColor="#003f5c"
            keyboardType="numeric"
            onChangeText={(text) => setSenha(text)}
          />
        </View>

        <TouchableOpacity onPress={onPressEsqueceuASenha}>
          <Text style={styles.forgotAndSignUpText}> Recupere sua senha </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressAcessar} style={styles.loginButton}>
          <Text style={styles.loginText}>Logar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressCadastrar}>
          <Text style={styles.forgotAndSignUpText}> Crie sua conta </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Produtos" component={Produtos} />
        <Stack.Screen name="Servicos" component={Servicos} />
        <Stack.Screen name="Carrinho" component={Carrinho} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />
        <Stack.Screen name="CriarConta" component={CriarConta} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="AgendarServico" component={AgendarServico} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  agendarButton: {
    backgroundColor: '#FF4500',
    borderColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    marginTop: 20,
    alignItems: 'center',
  },
  agendarButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  inputView: {
    width: '80%',
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderColor: 'black',
    height: 68,
    marginBottom: 20,
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    alignContent: 'flex-start',
    borderRadius: 25,
    borderWidth: 2,
  },
  inputText: {
    height: 50,
    color: '#FF4500',
  },
  forgotAndSignUpText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#FF4500',
    borderColor: 'black',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 25,
    borderWidth: 2,
  },
  loginText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  carrinhoButton: {
    backgroundColor: '#FF4500',
    borderColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    marginTop: 20,
    alignItems: 'center',
  },
  carrinhoButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titles: {
    marginTop: 160,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#FF4500',
    textShadowRadius: 1,
    textShadowOffset: { width: 4, height: 3 },
  },
  boxItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4500',
    borderColor: '#333',
    marginTop: 30,
    marginHorizontal: 10,
    width: 160,
    height: 180,
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  mapButton: {
    backgroundColor: '#FF4500',
    borderColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    marginTop: 20,
    alignItems: 'center',
  },
  mapButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagem: {
    flex: 1,
    width: 400,
    height: 800,
    resizeMode: 'cover',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default App;
