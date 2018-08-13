import { AsyncStorage } from 'react-native';

export default class MyStorage{

  /*
   Function Description: Load tasks from a database.

   Parameters: None

   Return: Array of tasks
   */
  load = async () => {
    const currentData = JSON.parse(
      await AsyncStorage.getItem('storageTasks')
    );

    return (currentData === (undefined || null) ? [] : currentData);
  };

  /*
   Function Description: Add task to database.

   Parameters: Task to insert.

   Return: Task inserted with an Id.
  */
  add = async (data) => {
    const currentData = await this.load();

    const newData = {
      id: currentData.length > 0 ?
        (currentData[currentData.length - 1].id + 1) :
        1,
      title: data.title,
      description: data.description,
      rating: data.rating
    };

    currentData.push(newData);

    await AsyncStorage.setItem('storageTasks', JSON.stringify(currentData));

    return newData;
  };

  /*
    Function Description: Remove a task from database.

    Parameters: Id of the task to remove.

    Return: Array of Tasks.
  */
  destroy = async (id) => {
    const currentData = await this.load();

    currentData.forEach((element, index, array) => {
      if(element.id === id){
        array.splice(index, 1);
      }
    });

    await AsyncStorage.setItem('storageTasks', JSON.stringify(currentData));

    return currentData;
  };


  /*
   Function Description: Update a task in database.

   Parameters: Id of task, data to update.

   Return: Array of Tasks
   */
  update = async (id, data) => {
    
    const currentData = await this.load();

    currentData.forEach((element, index, array) => {
      if(element.id === id){
        element.title = data.title;
        element.description = data.description;
        element.rating = data.rating;
      }
    });

    await AsyncStorage.setItem('storageTasks', JSON.stringify(currentData));

    return currentData;
  };
}
