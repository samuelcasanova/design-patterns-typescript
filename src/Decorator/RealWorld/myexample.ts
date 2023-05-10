/**
 * EN: Decorator Design Pattern
 *
 * Intent: Lets you attach new behaviors to objects by placing these objects
 * inside special wrapper objects that contain the behaviors.
 */

/**
 * EN: The base Component interface defines operations that can be altered by
 * decorators.
 *
 * RU: Базовый интерфейс Компонента определяет поведение, которое изменяется
 * декораторами.
 */
export interface DataSource {
  getData(): string;
}

/**
* EN: Concrete Components provide default implementations of the operations.
* There might be several variations of these classes.
*/
export class TextDataSource implements DataSource {
  public getData(): string {
      return `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec\
purus massa, imperdiet in libero quis, semper pulvinar risus. In hac\
habitasse platea dictumst. <b>Nullam</b> nec suscipit leo, id faucibus odio.\
Sed consectetur tempor pulvinar. Pellentesque vulputate accumsan enim\
sit amet viverra. Cras nisl elit, tempor quis elementum nec, maximus at\
dui. Proin eget tellus eget ante aliquam ultricies et nec tellus. Ut\
id finibus felis.</p>`;
  }
}

/**
* EN: The base Decorator class follows the same interface as the other
* components. The primary purpose of this class is to define the wrapping
* interface for all concrete decorators. The default implementation of the
* wrapping code might include a field for storing a wrapped component and the
* means to initialize it.
*/
export abstract class Decorator implements DataSource {
  protected dataSource: DataSource;

  constructor(dataSource: DataSource) {
      this.dataSource = dataSource;
  }

  public getData(): string {
      return this.dataSource.getData();
  }
}

/**
* EN: Concrete Decorators call the wrapped object and alter its result in some
* way.
*/
export class CryptoDecorator extends Decorator {
  public getData(): string {
      const baseData = this.dataSource.getData();
      const encryptedData = baseData.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 1)).join('')
      return encryptedData
  }
}

export class SanitizeDecorator extends Decorator {
  public getData(): string {
      const baseData = this.dataSource.getData();
      const sanitizedData = baseData.replace(/<\/?\w>/g, '')
      return sanitizedData
  }
}

/**
* EN: The client code works with all objects using the Component interface.
* This way it can stay independent of the concrete classes of components it
* works with.
*/
const dataSource = new TextDataSource();
const sanitized = new SanitizeDecorator(dataSource)
const sanitizedEncrypted = new CryptoDecorator(sanitized)

console.log('Final text is:');
console.log(sanitizedEncrypted.getData());
